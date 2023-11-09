import React,{useState} from 'react';
import Checkmark from "../Asset/Images/Checkmark.png";
import Flowshit from "../Asset/Images/flowshit.gif";
import axios from 'axios';
import LoaderComponet from './LoderComponent'
function Screen8() {

     const [loading, setLoading] = useState(false);

  const accessShopifyStore = async () => {
    const response = await axios.get(`http://localhost:3010/api/store/url`);
    if (response.data.shop) {
      setLoading(false);
      const newTab = window.open(
        `https://admin.shopify.com/store/${response.data.shop}`,
        "_blank"
      );
      newTab.focus();
    }
    };
    

    return (
        <div id="body">
             {loading ? (
        <LoaderComponet loading />
      ) : null}
            <section className="c-main">
                <div className="c-cricle_imgs6">
                    <img src={Flowshit} alt="" srcSet="" />
                </div>
                <div className="c-content_box c_screen_8box">
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
