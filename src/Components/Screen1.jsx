import React,{useState} from 'react';
import Flowshit from "../Asset/Images/flowshit.gif";
import Group1314 from "../Asset/Images/Group-1314.png"
import '../Asset/AI.css'
import { useNavigate } from "react-router-dom";
import LoaderComponet from "./LoderComponent/index";
import axios from "axios";

function Screen1() {
    axios.defaults.withCredentials = true;
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the corresponding error message when the user types
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const buildHandle = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone cannot be empty';
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'Phone should be a number';
    }

    if (!formData.email) {
      newErrors.email = 'Email cannot be empty';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email must be a valid email address';
    }

    if (Object.keys(newErrors).length === 0) {
      // All fields are valid, proceed with the form submission
      setLoading(true);
      axios
        .post("http://ai-accelerator.io:3010/api/users", formData)
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);
            setResponseMessage("Data saved successfully");
            // Redirect to another page on success
            navigate("/s2");
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
          setResponseMessage("Error saving data");
          // Redirect to another page on error
          navigate("/");
        });
    } else {
      // Display the errors
      setErrors(newErrors);
    }
  };

  // function redirectToXYZ() {
  //   const newTab = window.open(
  //     `https://www.jacoblevinrad.com`,
  //     "_blank"
  //   );
  //   newTab.focus();
  // }

 const handleSubmit = (e) => {
  e.preventDefault(); // Prevent the form from submitting in the default way (which appends data to the URL).
  buildHandle(); // Call your custom function to handle the form data.
};


    return (
        <div id="body">
             {loading ? (
        <LoaderComponet loading={loading} />
      ) : null}
            <section className="c-main">
                <div className="c-cricle_img" 
                // style={{ backgroundImage: `url(${Flowshit}) `, width: '700px', height: '700px', backgroundSize: 'cover', }}
                >
                    <img src={Flowshit} alt="" srcSet="" /> 
                </div>
                <div className="c-content_box">
                    <div className="c-content_cont">
                        <h2>
                            <span className="c-content_span-1">Ecommerce</span>
                            <span className="c-content_span-2">Meets</span>
                            <span className="c-content_span-3">AI</span>
                        </h2>
                        <p>
                            Presenting our cutting-edge AI Accelerator,
                            <br />
                            engineered to effortlessly construct your
                            <br />
                            fully functional Shopify Ecommerce store
                            <br />
                            within mere seconds.
                        </p>
                    </div>
                    {/* Form */}
                    <div className="c-content_formbox">
                        <div>
                            <h3>Let’s Get Started!</h3>
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-4 c-content_formb_input">
                                            <p><label htmlFor="fname">Full Name</label></p>
                                            <input 
                                            type="text" 
                                            id="name" 
                                            name="name" 
                                            placeholder=""
                                            value={formData.name}
                                            onChange={handleChange} />
                                            <div className="error-message text-danger">{errors.name}</div>
                                        </div>

                                        <div className="col-md-4 c-content_formb_input">
                                            <p><label htmlFor="phone">Phone Number</label></p>
                                            <input type="tel" 
                                            id="phone" 
                                            name="phone" 
                                            placeholder=""
                                            value={formData.phone}
                                            onChange={handleChange} />
                                            <div className="error-message text-danger">{errors.phone}</div>
                                        </div>

                                        <div className="col-md-4 c-content_formb_input">
                                            <p><label htmlFor="email">Email</label></p>
                                            <input 
                                            type="email" 
                                            id="email" 
                                            name="email" 
                                            placeholder=""
                                            value={formData.email}
                                            onChange={handleChange} />
                                            <div className="error-message text-danger">{errors.email}</div>
                                        </div>

                                        <div className="col-md-12 c-content_formb_input">
                                            <button 
                                            >Build my store <img src={Group1314} alt="" srcSet="" /></button>
                                        </div>
                                    </div>                     
                                </form>
                                <div id="mt-4 text-danger">{responseMessage}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Screen1;
