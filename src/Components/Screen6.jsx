import React, { useState,useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoaderComponet from './LoderComponent'

function Screen6() {

axios.defaults.withCredentials = true;
  const [loading, setLoading] = useState(false);
  const [accessKeyError, setAccessKeyError] = useState('');
  const [formData, setFormData] = useState({
    accessToken: "",
  });
  const navigate = useNavigate();
  
  // const accessShopifyApp = async () => {
  //   setLoading(true);
  //   const response = await axios.get(`http://ai-accelerator.io:3010/api/store/url`);
  //   if (response.data.shop) {
  //     setLoading(false);
  //     const newTab = window.open(
  //       `https://admin.shopify.com/store/${response.data.shop}/settings/apps/development`,
  //       "_blank"
  //     );
  //     newTab.focus();
  //   }
  //   };

   
    
      const handleChange = (event) => {
    setFormData({
      ...formData,
      accessToken: event.target.value,
    });
    
  };

  // function redirectToXYZ() {
  //   const newTab = window.open(
  //     `https://www.jacoblevinrad.com`,
  //     "_blank"
  //   );
  //   newTab.focus();
  // }

    useEffect(() => {
    (async () => {
      const response = await axios.get(`http://ai-accelerator.io:3010/dashboard`);
      console.log(response);
      if (response.data === "Success") {
        navigate("/s6");
        console.log("Successded OK");
      } else {
        navigate("/");
      }
    })();
  }, [navigate]);

  const handleSubmit = (e) => {
    // e.preventDefault();

    if (!formData.accessToken) {
      setAccessKeyError('Please enter the Access Token');
      return; // Prevent form submission if store name is empty
    }

    setLoading(true);
    axios
      .post("http://ai-accelerator.io:3010/api/accesstoken", formData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setLoading(false);
          navigate("/s7");
        }

        console.log("Data saved successfully");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        navigate("/s6");
        console.log("Error saving data");
      });
    };
    

    return (
        <div className="c-screen_2">
              {loading ? (
        <LoaderComponet loading />
      ) : null}
            <div className="c-niche">
                <div className="c-niche_nextbtn">
                    <button onClick={handleSubmit}>
                        Next
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                    {accessKeyError && <p style={{ color: 'red' }}>{accessKeyError}</p>}
                </div>
                <div className="c-niche_video">
            <div className="c-niche_vide-set">
               <video style={{borderRadius:'26px'}} width="650" height="350" controls>
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
                                <p>Enter your Access Token</p>
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
                            type='text'
                            name="accessToken"
                            id="accessToken"
                            value={formData.accessToken}
                            onChange={handleChange}
                            placeholder='Enter Access Token Here...'
                        />
                        {accessKeyError && <p style={{ color: 'red' }}>{accessKeyError}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Screen6;
