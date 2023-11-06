import React, { useState, useEffect } from "react";
import Logo1 from "../Asset/Images/Gp.png";
import "../Asset/App.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoaderComponet from './LoderComponent'
import Cookies from "js-cookie";
export default function CreateStore() {
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;
  const [formData, setFormData] = useState({
    storeName: "",
  });

  const [storeNameError, setStoreNameError] = useState('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      storeName: event.target.value,
    });
    setStoreNameError(''); 
  };

  const navigate = useNavigate();
  const handleBtnClick = () => {
    redirectToAnotherUrl();
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate('/')
   }

  const redirectToAnotherUrl = () => {
    const newTab = window.open(
      "https://www.shopify.com/in/free-trial/3-steps?term=shopify%20store%20create&adid=566014743789&campaignid=15433369407&branded_enterprise=1&BOID=brand&gclid=Cj0KCQjwx5qoBhDyARIsAPbMagDzeSd67y_lNIR5KfkCo0wbFWv3Y08p-uooIyYWLWz7BvF6ByjspAsaAt52EALw_wcB&cmadid=516585705;cmadvertiserid=10730501;cmcampaignid=26990768;cmplacementid=324494758;cmcreativeid=163722649;cmsiteid=5500011",
      "_blank"
    );
    newTab.focus();
  };
  useEffect(() => {
    (async () => {
      const response = await axios.get(`http://ai-accelerator.io:3010/dashboard`);
      console.log(response);
      if (response.data === "Success") {
        navigate("/create-store");
        console.log("Successded OK");
      } else {
        navigate("/");
      }
    })();
  }, [navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.storeName) {
      setStoreNameError('Please enter the store name.');
      return; // Prevent form submission if store name is empty
    }

    setLoading(true);
    axios
      .post("http://ai-accelerator.io:3010/api/store", formData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setLoading(false);
          navigate("/info-page");
        }

        console.log("Data saved successfully");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        navigate("/product-import");
        console.log("Error saving data");
      });
  };

  function redirectToXYZ() {
    const newTab = window.open(
      `https://www.jacoblevinrad.com`,
      "_blank"
    );
    newTab.focus();
  }

  return (
    <div className="content">
      {loading ? (
        <LoaderComponet loading />
      ) : (" ")}
      <div className="container">
        <div className="row justify-content-center outer1 pb-0">
          <div className="col-md-12 pt-4">
            <div className="col-md-12 pb-5 mb-5">
              <div className="row justify-content-center align-items-center">
                <div className="col-md-2">
                  <p className="mb-0">
                    <Link to="/" onClick={handleLogout}>
                    <img src={Logo1} alt="not found" className="img-fluid" />
                    </Link>
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
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <p className="choose">#4 Next Steps:</p>
                </div>
              </div>


              <div className="row pt-3">
                <div className="col-md-6">
                  <div className="c-create_store">
                    <button className="btn btn-primary" onClick={handleBtnClick}>
                      Create Store
                    </button>
                  </div>
                  <div className="box-outer1">
                    <ul>
                      <li>
                        Click on <b>“Create Store”</b> Button First
                      </li>
                      <li>Fill in the field with your best email</li>
                      <li>Complete registration information</li>
                      <li>Copy Your Store name from URL Address</li>
                      <li>Return to this tab</li>
                      <li>Paste the Store name in the field below</li>
                      <li>Click on the Next button</li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="box-outer1">
                    <video width="500" height="360" controls>
                      <source
                        src="http://ai-accelerator.io/videoAsset/access-key.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                  <div className="col-md-8"></div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control w-100"
                    name="store_name"
                    id="store"
                    placeholder="Enter Store Name Here"
                    value={formData.storeName}
                    onChange={handleChange}
                  />
                   
                </div>
                <div className="col-md-4 text-left store-btn-outer pb-3">
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Next
                  </button>
                </div>
                {storeNameError && <p style={{ color: 'red' }}>{storeNameError}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
