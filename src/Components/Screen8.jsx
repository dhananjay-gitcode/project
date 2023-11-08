import React,{useState,useEffect} from 'react';
import Animate6 from "../Asset/Images/Animate-scre-6.svg";
import Checkmark from "../Asset/Images/Checkmark.png";
import axios from 'axios';
import LoaderComponet from './LoderComponent'
import { useNavigate } from "react-router-dom";
import Flowshit from "../Asset/Images/flowshit.gif";

function Screen8() {

axios.defaults.withCredentials = true;
    const [loading, setLoading] = useState(false);
       const navigate = useNavigate();
      useEffect(() => {
    (async () => {
      const response = await axios.get(`http://ai-accelerator.io:3010/dashboard`);
      console.log(response);
      if (response.data === "Success") {
        navigate("/s8");
        console.log("Successded OK");
      } else {
        navigate("/");
      }
    })();
  }, [navigate]);

  const accessShopifyStore = async () => {
    const response = await axios.get(`http://ai-accelerator.io:3010/api/store/url`);
    if (response.data.shop) {
      setLoading(false);
      const newTab = window.open(
        `https://admin.shopify.com/store/${response.data.shop}`,
        "_blank"
      );
      newTab.focus();
    }
    };

       useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); 
    return () => clearTimeout(timeout);
  }, []);
    

    return (
        <div id="body">
             {loading ? (
        <LoaderComponet loading />
      ) : null}
            <section className="c-main">
                <div className="c-cricle_imgs6 c-cricle_hss">
                    <img src={Flowshit} alt="" srcSet="" />
                </div>
                <div className="c-content_box">
                    <div className="c-content_boxh7">
                        <h3>COMPLETE</h3>
                    </div>
                    <div className="c-content_boxscree-6">
                        <img src={Checkmark} alt="" srcSet="" />
                    </div>
                    <div className="c-content_boxscree-btn">
                        <button onClick={accessShopifyStore}>TAKE ME TO MY STORE</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Screen8;
