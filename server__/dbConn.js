const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {
  
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  userId: String,
  name: String,
  phone: String,
  selectedItem: String,
  password: String,
  email: String,
  shop: String,
  importProduct: Boolean,
  notImportProduct: Boolean,
  referralCode: String,
  createdAt: Date,

});


const ShopSchema = new mongoose.Schema({
  shop: String,
  hmac: String,
  accessToken: String,
  email: String,
  installedTime: Date,
});

// const productSchema = new mongoose.Schema({
//   title: String,
//   vendor: String,
// product_category:String,
//   variants: [
//     {
//       cost_per_item: String,
//       profit: String,
//     },
//   ],
//   images: [
//     {
//       src: String,
//     },
//   ],
// });




const ProductVariantSchema = new mongoose.Schema({
  price: String,
  cost_per_item: String,
  profit: String,
  images: [
    {
      src: String, // Assuming image_Src represents the image source
    },
    {
      src: String, // Assuming image_Src represents the image source
    },
    {
      src: String, // Assuming image_Src represents the image source
    },
    {
      src: String, // Assuming image_Src represents the image source
    },
    {
      src: String, // Assuming image_Src represents the image source
    },
  ],
  // Other fields specific to your application
  // You can add more fields as needed
});

const ProductSchema = new mongoose.Schema({
  product_category: String,
  title: String,
  body_html: String,
  vendor: String,
  variants: [ProductVariantSchema], 
});


const Product = mongoose.model("Product", ProductSchema);

const Shop = mongoose.model('Shop', ShopSchema, 'Store');
const User = mongoose.model('Users', userSchema, 'Users');

module.exports = {
  User,
  Shop,
  Product,
};