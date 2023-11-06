import React, { useState } from "react";
import Logo1 from "../Asset/Images/Gp.png";
import Logo from "../Asset/Images/Logo.png";
import "../Asset/App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoaderComponet from "./LoderComponent/index";

export default function PersonalDetails() {
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
            navigate("/theme");
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

  function redirectToXYZ() {
    const newTab = window.open(
      `https://www.jacoblevinrad.com`,
      "_blank"
    );
    newTab.focus();
  }

 
   


  return (
    <div className="conten">
      {loading ? (
        <LoaderComponet loading={loading} />
      ) : null}
      <div className="container container-fluid">
        <div className="row justify-content-center outer">
          <div className="col-md-12 pt-4">
            <div className="col-md-12 pb-5 mb-5">
              <div className="row justify-content-center align-items-center">
                <div className="col-md-2">
                  <p className="mb-0">
                    <img src={Logo1} alt="not found" className="img-fluid" />
                  </p>
                </div>
                <div className="col-md-8">
                  <p className="meet text-center mb-0"
                  style={{cursor: 'pointer'}}
                  onClick={redirectToXYZ}>
                  
                    Meet the creator: Jacob Levinrad
                  </p>
                </div>
                <div className="col-md-2 d-flex justify-content-end">
                  {/* <button className="create">
                    <a href="/">Create</a>
                  </button> */}
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-7 position-relative">
                <p className="mb-0">
                  <img src={Logo} alt="not found" className="img-fluid" />
                </p>
                <p style={{ fontSize: "14px" }} className="mt-0 mb-0">
                  (ARTIFICIAL INTELLIGENCE)
                </p>
                <h3 className="heading mb-0">
                  <p
                    className="mb-0"
                    style={{
                      fontFamily: "DM Serif Display",
                      fontWeight: 600,
                      fontStyle: "italic",
                      color: "#fff",
                    }}
                  >
                    MEETS
                  </p>
                  <p className="head mb-0">ECOMMERCE</p>
                </h3>
                <p className="mt-2 c-ecommer_p">
                  Presenting our cutting-edge AI Accelerator, engineered to
                  effortlessly construct your fully functional Shopify Ecommerce
                  store within mere seconds.
                </p>
              </div>
              <div className="col-lg-5">
                <form
                  className="mb-5 form-outer"
                  id="contactForm"
                  name="contactForm"
                >
                  <div className="row">
                    <div className="col-md-12">
                      <p className="info">Let's get started:</p>
                    </div>
                    <div className="col-md-12 form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <div className="error-message text-danger">{errors.name}</div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 form-group mt-3">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        id="phonenumber"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      <div className="error-message text-danger">{errors.phone}</div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 form-group mt-3">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <div className="error-message text-danger">{errors.email}</div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 text-center">
                      <input
                        type="submit"
                        value="BUILD"
                        onClick={(e) => {
                          e.preventDefault();
                          buildHandle();
                        }}
                        className="btn btn-primary rounded-0 py-2 px-4 mt-3"
                      />
                      <span className="submitting"></span>
                    </div>
                  </div>
                </form>
                <div id="mt-4 text-danger">{responseMessage}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
