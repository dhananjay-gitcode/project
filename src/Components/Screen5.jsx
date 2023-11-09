import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Flowshit from "../Asset/Images/flowshit.gif";
import LoaderComponet from './LoderComponent'
import Cookies from "js-cookie";

function Screen5() {
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
        navigate("/s5");
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
          navigate("/s6");
        }

        console.log("Data saved successfully");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        navigate("/s5");
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
      <div className="c-screen_2">
        <div
          className="c-cricle_img"
          // style={{ backgroundImage: `url(${Flowshit}) `, width: '700px', height: '700px', backgroundSize: 'cover', }}
        >
          <img src={Flowshit} alt="" srcSet="" />
        </div>
        {loading ? <LoaderComponet loading /> : null}
        <div className="c-niche">
          <div className="c-niche_nextbtn">
            <button onClick={handleSubmit}>
              Next
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <div className="c-niche_video">
            <div className="c-niche_vide-set">
              <video
                width="100%"
                height="100%"
                style={{ borderRadius: "10px" }}
                controls
              >
                <source
                  src="http://ai-accelerator.io/videoAsset/ai-shopify.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
          <div className="c-niche_box-title">
            <h3 className="text-center">Last Step: </h3>
            <div className="row m-0">
              <div className="col-md-3">
                <div className="c-niche_box-list">
                  <h4 className="c-niche_box-list-hh">1.</h4>
                  <p>Enter your store name</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="c-niche_box-list">
                  <h4 className="c-niche_box-list-hh">2.</h4>
                  <p>Select “Install App”</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="c-niche_box-list">
                  <h4 className="c-niche_box-list-hh">3.</h4>
                  <p>Redirected to your Shopify store</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="c-niche_box-list">
                  <h4 className="c-niche_box-list-hh">4.</h4>
                  <p>After installation, you are ready to go</p>
                </div>
              </div>
            </div>
            <div className="c-niche_box_sc5">
              <input
                type="text"
                name="store_name"
                id="store"
                value={formData.storeName}
                onChange={handleChange}
                placeholder="Enter Store Name Here..."
              />
              {storeNameError && (
                <p style={{ color: "red" }}>{storeNameError}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Screen5;
