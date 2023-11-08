const express = require('express');
const request = require('request-promise');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const cookieParese = require('cookie-parser');
const bodyParser = require('body-parser');
const { User, Shop, Product } = require('./dbConn');
const axios = require('axios');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3010;
const dayjs = require("dayjs");
// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET, POST',
  credentials: true
}))



app.use(cookieParese())
app.use(express.json());
app.use(bodyParser.json());


const themesToUpload = [
  {
    name: "Beauty",
    src: "http://ai-accelerator.io/themes/beauty.zip",
    role: "unpublished",
  },
  {
    name: "Gym/Sports",
    src: "http://ai-accelerator.io/themes/fitness.zip",
    role: "unpublished",
  },
  {
    name: "Home/Office",
    src: "http://ai-accelerator.io/themes/home.zip",
    role: "unpublished",
  },
  {
    name: "Kids",
    src: "http://ai-accelerator.io/themes/kids.zip",
    role: "unpublished",
  },
  {
    name: "Pets",
    src: "http://ai-accelerator.io/themes/pet.zip",
    role: "unpublished",
  },
  {
    name: "Technology",
    src: "http://ai-accelerator.io/themes/tech.zip",
    role: "unpublished",
  },
  {
    name: "Car",
    src: "http://ai-accelerator.io/themes/tech.zip",
    role: "unpublished",
  },
  {
    name: "Fashion",
    src: "http://ai-accelerator.io/themes/beauty.zip",
    role: "unpublished",
  },
];

const counterSchema = new mongoose.Schema({
  _id: String, // Field name for the counter (e.g., 'userId')
  seq: Number, // Current sequence number
});

const Counter = mongoose.model("Counter", counterSchema);

// Define the function to get the next user ID
async function getNextUserId() {
  const counter = await Counter.findByIdAndUpdate(
    'userId', // Use the '_id' for the counter document
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return `userID${counter.seq}`;
}


function generatePassword() {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let password = '';
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
}

// Function to generate a random 5-character referral code in lowercase letters
function generateReferralCode() {
  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let referralCode = '';
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    referralCode += charset.charAt(randomIndex);
  }
  return referralCode;
}


const varifyUser = (req, res, next) => {
  const token = req.cookies.token;
  //  console.log(token);
  // console.log("hello")
  if (!token) {
    return res.json("Token is missing");
  }
  else {
    jwt.verify(token, "jwt-scret-key", (err, decoded) => {
      if (err) {
        return res.json("Error with token")
      }
      else {
        req.userEmail = decoded.email;
        next()
      }
    })
  }
}

app.get('/dashboard', varifyUser, async (req, res) => {

  res.json("Success");

})

app.get('/api/store/url', varifyUser ,async (req, res) => {
  //console.log("")
  const user = await User.findOne({ email: req.userEmail })
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
    console.log("User not found")
  }
  else {
    console.log("User found");
    res.json(user);
  }

})

app.post('/api/accesstoken',varifyUser, async (req, res) => {
  console.log(req.body.accessToken)
  User.findOne({ email: req.userEmail })
    .then(user => {
      if (user) {
        user.accessToken = req.body.accessToken;
      }
      user.save()
        .then(updatedUser => {
          console.log(`Database${updatedUser}`)
          console.log('User data updated:', updatedUser);
          if(updatedUser.importProduct){
            addProductsToShopify(updatedUser.shop, updatedUser.accessToken,updatedUser.selectedItem)
          }
          
          UploadThemes(updatedUser.selectedItem, updatedUser.shop, updatedUser.accessToken);
          res.json({ message: 'User data updated.' });
        })
        .catch(error => {
          console.error('Error updating user data:', error);
          res.status(500).json({ error: 'Failed to update user data.' });
        });
    })
    .catch(error => {
      console.error('Error finding user:', error);
      res.status(500).json({ error: 'Failed to find user.' });
    });
})

app.post('/api/store', varifyUser,async (req, res) => {
  console.log(req.body.storeName)
  User.findOne({ email: req.userEmail })
    .then(user => {
      if (user) {
        user.shop = req.body.storeName;
      }
      user.save()
        .then(updatedUser => {
          console.log('User data updated:', updatedUser);
          res.json({ message: 'User data updated.' });
        })
        .catch(error => {
          console.error('Error updating user data:', error);
          res.status(500).json({ error: 'Failed to update user data.' });
        });
    })
    .catch(error => {
      console.error('Error finding user:', error);
      res.status(500).json({ error: 'Failed to find user.' });
    });
})

app.post('/api/products', varifyUser,async (req, res) => {
  console.log(req.body.importProduct)
  User.findOne({ email: req.userEmail })
    .then(user => {
      if (user) {
        user.importProduct = req.body.importProduct;
      }
      user.save()
        .then(updatedUser => {
          console.log('User data updated:', updatedUser);
          res.json({ message: 'User data updated.' });
        })
        .catch(error => {
          console.error('Error updating user data:', error);
          res.status(500).json({ error: 'Failed to update user data.' });
        });
    })
    .catch(error => {
      console.error('Error finding user:', error);
      res.status(500).json({ error: 'Failed to find user.' });
    });
})

app.post("/api/themes", varifyUser,async (req, res) => {
  console.log(req.body.selectedItem);
  User.findOne({ email: req.userEmail })
    .then((user) => {
      if (user) {
        user.selectedItem = req.body.selectedItem;
        user
          .save()
          .then((updatedUser) => {
            console.log("User data updated:", updatedUser);
            res.json({ message: "User data updated." });
          })
          .catch((error) => {
            console.error("Error updating user data:", error);
            res.status(500).json({ error: "Failed to update user data." });
          });
      } else {
        console.error("User not found.");
        res.status(404).json({ error: "User not found." });
      }
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res.status(500).json({ error: "Failed to find user." });
    });
});


app.post('/api/users', (req, res) => {
  const userData = req.body;
  console.log(userData)
  const referralCode = generateReferralCode();
  const password = generatePassword();
 
  userData.password = password;
  userData.referralCode = referralCode;

let today = dayjs().format("YYYY-MM-DD h:mm:ss");

  userData.createdAt = today;

 // Generate and assign the 'userId' field
  getNextUserId().then((userId) => {
    userData.userId = userId; 
  

  const user = new User(userData);
  User.findOne({ email: userData.email })
    .then(useremail => {
      if (!useremail) {
        user.save()
          .then(() => {
            // addProductsToShopify(shopurl,access_token)
            // UploadThemes(userData.selectedItem,shopurl,access_token);
            const token = jwt.sign({ email: user.email },
              "jwt-scret-key", { expiresIn: '365d' })
            res.cookie("token", token)
            // console.log('Data saved successfully');
            res.status(200).json({ message: 'Data saved successfully node backend' });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Error saving data' });
          });
      }
      else {
        User.findOneAndUpdate({ email: userData.email }, userData, { new: true })
          .then((updatedUser) => {
            //     addProductsToShopify(shopurl,access_token)
            //    UploadThemes(userData.selectedItem,shopurl,access_token);
            const token = jwt.sign({ email: user.email },
              "jwt-scret-key", { expiresIn: '365d' })
            res.cookie("token", token)
            console.log('Data updated successfully');
            res.status(200).json({ message: 'Data updated successfully', user: updatedUser });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Error updating data' });
          });
      }


    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Error checking for existing user' });
    });
  });
});


async function addProductsToShopify(shopifyStoreUrl, accessToken,selectedItem) {
  try {
    // Connect to MongoDB
    console.log(`url${shopifyStoreUrl}`)
    console.log(`Accesstoken${accessToken}`)
    const products = await Product.find({});

    for (const productData of products) {
      // Create a product in Shopify
     
      if(productData.product_category === selectedItem){
        console.log(productData.variants[0].images.length); 
       
        const productImages = [];
        const maxImages = 3; // You can change this to the maximum number of images you want to upload
        
        for (let i = 0;i < productData.variants[0].images.length; i++) {
          productImages.push({
            src: productData.variants[0].images[i]?.src,
          });
        }
     
      const response = await axios({
        method: "POST",
        url: `https://${shopifyStoreUrl}.myshopify.com/admin/api/2023-07/products.json`,
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
        data: {
          product: {
            title: productData.title,
            body_html: productData.body_html,
            //vendor: productData.vendor
            variants: [
              {
                price: productData.variants[0].price,
              },
            ],

            images: productImages,

          },
        },
      });

      console.log("Product added to Shopify:", response.data.product);
    }
    }

  } catch (error) {
    console.error("Error:", error);
  }
}

const UploadThemes = (selectedTheme, shopifyStoreUrl, accessToken) => {
  // const shopifyStoreUrl='https://quick-start-c76a07e5.myshopify.com';
  // const accessToken='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';
  console.log("Slected Theme data", selectedTheme);
  // console.log(selectedTheme);

  let matchingTheme = null;
  // && theme.src === selectedTheme.src
  // Loop through the themesToUpload array to find a match
  for (const theme of themesToUpload) {
    if (theme.name === selectedTheme) {
      matchingTheme = theme;
      matchingTheme.role = "main";
      break; // Exit the loop once a match is found
    }
  }
  if (matchingTheme) {
    console.log("Match found:");
    // console.log(matchingTheme);
  } else {
    console.log("No matching theme found.");
  }

  // Function to upload a single theme
  function uploadTheme(theme, shopifyStoreUrl, accessToken) {
    const dataJson = JSON.stringify({ theme });

    const apiUrl = `https://${shopifyStoreUrl}.myshopify.com/admin/api/2023-07/themes.json`;

    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    };

    return axios.post(apiUrl, dataJson, { headers });
  }

  //const uploadPromises = themesToUpload.map(uploadTheme);
  const uploadPromises = uploadTheme(matchingTheme, shopifyStoreUrl, accessToken);
  // Only upload the matching theme
  //  const uploadPromises = [uploadTheme(matchingTheme)];

  console.log(matchingTheme);
  //Promise.all(uploadPromises)
  uploadPromises
    .then((responses) => {
      console.log(responses.data);
      // Process responses here
      // responses.forEach((response) => {
      //   console.log(response.data);
      // });
    })
    .catch((error) => {
      console.error(error);
    });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
