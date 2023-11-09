import React,{useState} from 'react';
import Animate6 from "../Asset/Images/Animate-scre-6.svg"
import { useNavigate } from "react-router-dom";
import Flowshit from "../Asset/Images/flowshit.gif";
import LoaderComponet from './LoderComponent'
function Screen7() {


    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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
    

    return (
      <div id="body">
        {loading ? <LoaderComponet loading /> : null}

        <section className="c-main">
          <div className="c-cricle_imgs6 c-cricle_hss">
            <img src={Flowshit} alt="" srcSet="" />
          </div>
          <div className="c-content_box c-content7_box">
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
                <video
                  width="100%"
                  height="100%"
                  
                  style={{ borderRadius: "26px" }}
                  controls
                >
                  <source
                    src="http://ai-accelerator.io/videoAsset/ai-shopify.mp4"
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
