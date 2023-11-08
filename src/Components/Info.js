import React, { useState, useEffect } from "react";
import Logo1 from "../Asset/Images/Gp.png";
import "../Asset/App.css";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import LoaderComponet from './LoderComponent'
import Cookies from "js-cookie";
export default function Info() {


  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    (async () => {
      setLoading(true)
      const response = await axios.get(`http://localhost:3010/dashboard`);
      console.log(response);
      if (response.data === "Success") {
        setLoading(false)
        navigate("/info-page");
        console.log("Successded OK");
      } else {
        setLoading(false);
        navigate("/");
      }
    })();
  }, [navigate]);

  const accessShopifyApp = async () => {
    const response = await axios.get(`http://localhost:3010/api/store/url`);
    if (response.data.shop) {
      const newTab = window.open(
        `https://admin.shopify.com/store/${response.data.shop}/settings/apps/development`,
        "_blank"
      );
      newTab.focus();
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate('/')
   }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/access-key");
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
                  <p className="choose mb-0">
                    To set up the App on Shopify, follow these steps:
                  </p>
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-12">
                  <div className="box-outer1">
                    <ul className="pl-3">
                      <li>
                        Click the button below "Access Shopify Apps" screen. The
                        screen will open in a new tab, so you can return to this
                        one and continue.
                      </li>
                      <li>
                        On the Shopify screen, click "Allow custom app
                        development."
                      </li>
                      <li>Click again on "Allow custom app development."</li>
                      <li>Click "Create an app."</li>
                      <li>
                        Fill in the "Name" with <b>"ai-accelerator"</b>
                      </li>
                      <li>Click "Create app."</li>
                      <li>Click "Configure Admin API Scopes."</li>
                      <li>
                        Select ALL access scope options on this screen, scroll
                        to the bottom to ensure all have been selected
                        (basically, this means check EVERY BOX shown in
                        Shopify).
                      </li>
                      <li>
                        After selecting all the options, click on the "Save"
                        button at the top of the screen. If necessary, scroll up
                        to the top.
                      </li>
                      <li>Return to this tab to continue.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <button
                  onClick={() => {
                    accessShopifyApp();
                  }}
                  className="btn btn-primary"
                >
                  Access Shopify Apps
                </button>

                <button
                  className="btn btn-primary accessShopifyNxt"
                  onClick={handleSubmit}
                >
                  Next Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
