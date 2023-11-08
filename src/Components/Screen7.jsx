import React,{useState,useEffect} from 'react';
import Animate6 from "../Asset/Images/Animate-scre-6.svg"
import { useNavigate } from "react-router-dom";
import LoaderComponet from './LoderComponent'
import axios from 'axios';
import Flowshit from "../Asset/Images/flowshit.gif";

function Screen7() {

    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    (async () => {
      const response = await axios.get(`http://ai-accelerator.io:3010/dashboard`);
      console.log(response);
      if (response.data === "Success") {
        navigate("/s7");
        console.log("Successded OK");
      } else {
        navigate("/");
      }
    })();
  }, [navigate]);

    function redirectToXYZ() {
    const newTab = window.open(
      `https://getstartedtiktok.pxf.io/vN0aLj`,
      "_blank"
    );
    newTab.focus();
    }

    const finishBtn = () => {
        navigate('/s8')
    }

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
                    <div className="c-niche_nextbtn">
                        <button onClick={finishBtn}>
                            Finish
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                    <div className="c-content_boxh3">
                        <h3>Almost done!</h3>
                    </div>
                    <div className="c-content_boxscree-6">
                        <div className="c-content_boxscree-6_vide">
                        <video style={{borderRadius:'26px'}} width="650" height="350" controls>
                        <source
                        src="http://ai-accelerator.io/videoAsset/ai-tiktok.mp4"
                        type="video/mp4"
                      />
                    </video>
                        </div>
                    </div>
                    <div className="c-content_boxscree-btn">
                        <button onClick={redirectToXYZ}>Tiktok Affiliate Link</button>
                    </div>
                        </div>
                       
            </section>
                
        </div>
    );
}

export default Screen7;
