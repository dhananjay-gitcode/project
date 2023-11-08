import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import LoaderComponet from './LoderComponent'
import axios from "axios";

function Screen4() {
    const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  
  const nxt = () => {
    navigate('/s5')
    }
    
    
 useEffect(() => {
   (async () => {
     setLoading(true);
     const response = await axios.get(`http://ai-accelerator.io:3010/dashboard`);
     console.log(response);
     if (response.data === "Success") {
       setLoading(false);
       navigate("/s4");
       console.log("Successded OK");
     } else {
       setLoading(false);
       navigate("/");
     }
   })();
 }, [navigate]);
    
    return (
        <div className="c-screen_2">
             {loading ? (
        <LoaderComponet loading />
      ) : null}
            <div className="c-niche">
                <div className="c-niche_nextbtn">
            <button
            onClick={nxt}>Next<i className="fa-solid fa-arrow-right"></i></button>
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
                    <h3 className="text-center">Next Steps:</h3>
                    <div className="row m-0">
                        <div className="col-md-3">
                            <div className="c-niche_box-list">
                                <h4 className="c-niche_box-list-hh">1.</h4>
                                <p>Select “Create Your Store” Below</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="c-niche_box-list">
                                <h4 className="c-niche_box-list-hh">2.</h4>
                                <p>Go on Shopify
                                    <i class="fa-solid fa-chevron-right c-icon-a"></i>
                                    Copy Store Name</p> 
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="c-niche_box-list">
                                <h4 className="c-niche_box-list-hh">3.</h4>
                                <p>Paste in the text box on the next page</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="c-niche_box-list">
                                <h4 className="c-niche_box-list-hh">4.</h4>
                                <p>Install App onto Shopify</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Screen4;
