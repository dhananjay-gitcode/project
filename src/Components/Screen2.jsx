import React,{useState,useEffect} from "react";
import Pets from "../Asset/Images/Pets.png";
import Home from "../Asset/Images/home.png";
import Flowshit from "../Asset/Images/flowshit.gif";
import Dumbbell from "../Asset/Images/Dumbbell.png";
import Workstation from "../Asset/Images/Workstation.png";
import Spa from "../Asset/Images/Spa-Flower.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoaderComponet from './LoderComponent'

function Screen2() {
    axios.defaults.withCredentials = true;

   const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    selectedItem: "",
  });


 useEffect(() => {
   (async () => {
     const response = await axios.get(`http://ai-accelerator.io:3010/dashboard`);
     console.log(response);
     if (response.data === "Success") {
       navigate("/s2");
       console.log("Successded OK");
     } else {
       navigate("/");
     }
   })();
 }, []);

  const niches = [
    { image: Pets, label: "Pets" },
    { image: Home, label: "Home/Office" },
    { image: Dumbbell, label: "Gym/Sports" },
    { image: Workstation, label: "Technology" },
    { image: Spa, label: "Beauty" },
  ];

   const handleItemClick = (item) => {
    setFormData((prevState) => ({ ...prevState, selectedItem: item }));

 };



const [themeError, setThemeError] = useState('');
 const handleSubmit = (e) => {
   e.preventDefault();

     if (!formData.selectedItem) {
      setThemeError("Please select a theme.");
      return;
    }
   axios
     .post("http://ai-accelerator.io:3010/api/themes", formData)
     .then((response) => {
       console.log(response);
       if (response.status === 200) {
         navigate("/s3");
       }

       setResponseMessage("Data saved successfully");
     })
     .catch((error) => {
       console.error(error);
       navigate("/s2");
       setResponseMessage("Error saving data");
     });
 };



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
            {/* <a href="http">Next<i className="fa-solid fa-arrow-right"></i></a> */}
            <button onClick={handleSubmit}>
              Next<i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <div className="c-niche_video">
            <div className="c-niche_vide-set">
              {/* You can add content or components here */}
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
            <h3>Select your niche:</h3>
            {themeError && <p style={{ color: "red", textAlign:'center' }}>{themeError}</p>}
            <div className="row m-0">
              {niches.map((niche, index) => (
                <div className="col-lg" key={index}>
                  <div
                    className={`c-niche_box-main ${
                      formData.selectedItem === niche.label
                        ? "selected-niche"
                        : ""
                    }`}
                    onClick={() => handleItemClick(niche.label)}
                  >
                    <div className="c-niche_box-item">
                      <img src={niche.image} alt={niche.label} />
                    </div>
                    <div className="c-niche_box-link">
                      <p>{niche.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );

}

export default Screen2; 