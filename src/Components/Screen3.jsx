import React,{useState, useEffect} from 'react';
import Done from "../Asset/Images/Done.png";
import Close from "../Asset/Images/Close.png"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoaderComponet from './LoderComponent'

function Screen3() {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
      const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
    importProduct: null,
  });

  const handleButtonClick = (value) => {
    setFormData({ importProduct: value==='YES' });
  };


     const [error, setError] = useState('');


   useEffect(() => {
     (async () => {
       const response = await axios.get(`http://ai-accelerator.io:3010/dashboard`);
       console.log(response);
       if (response.data === "Success") {
         navigate("/s3");
         console.log("Successded OK");
       } else {
         navigate("/");
       }
     })();
   }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.importProduct==null) {
      setError('Please tick one of them.');
    } else {
      setLoading(true);
      // If at least one checkbox is checked, proceed with the form submission
      axios
        .post("http://ai-accelerator.io:3010/api/products", formData)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setLoading(false);
            navigate("/s4");
          }
          console.log("Data saved successfully");
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          navigate("/s3");
          console.log("Error saving data");
        });
    }
  };


  return (
      <>
        <div className="c-screen_2">
            {loading ? (
        <LoaderComponet loading />
      ) : null}
            <div className="c-niche">
                <div className="c-niche_nextbtn">
                    {/* <a href="http://">Next<i className="fa-solid fa-arrow-right"></i></a> */}
                    <button type='submit'
                    onClick={handleSubmit}>Next<i className="fa-solid fa-arrow-right"></i></button>
          </div>
           {error && <p style={{ color: 'red' }}>{error}</p>}
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
                </div>
                <div className="c-niche_box-title">
                    <h3 className="text-center">DO You Want To Import The Products?</h3>
                    <div className=" m-0 c-niche_boxs3_row">
                       <div className="c-niche_boxs3-main">
  <div className={`c-niche_boxs3-item ${formData.importProduct === true ? 'clicked-button' : ''}`}>
    <img src={Done} alt="" srcSet="" />
  </div>
  <div className="c-niche_boxs3-link">
    <button onClick={() => handleButtonClick('YES')}>YES</button>
  </div>
</div>
<div className="c-niche_boxs3-main">
  <div className={`c-niche_boxs3-item ${formData.importProduct === false ? 'clicked-button' : ''}`}>
    <img src={Close} alt="" srcSet="" />
  </div>
  <div className="c-niche_boxs3-link">
    <button onClick={() => handleButtonClick('NO')}>NO</button>
  </div>

                        </div>
                    </div>
                </div>
            </div>
   
          
      </>
    );
}

export default Screen3;
