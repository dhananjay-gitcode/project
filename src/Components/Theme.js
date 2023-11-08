import React, { useState, useEffect } from "react";
import Logo1 from "../Asset/Images/Gp.png";
import Uns from "../Asset/Images/uns.png";
import "../Asset/App.css";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import LoaderComponet from './LoderComponent'
import Cookies from "js-cookie";

export default function Theme() {

  axios.defaults.withCredentials = true;
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    selectedItem: "",
  });

  const items = [
    { name: "Tech", label: "Technology" },
    { name: "Fitness", label: "Sports / Gym" },
    { name: "Beauty", label: "Beauty / Wellness" },
    { name: "Pets", label: "Pets" },
    { name: "Kids", label: "Children" },
    { name: "Home", label: "Home" },
    { name: "Car", label: "Car" },
    { name: "Fashion", label: "Fashion / Jewelry" },
  ];

  const handleLogout = () => {
    Cookies.remove("token");
    navigate('/')

   }

  const [themeError, setThemeError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axios.get(`http://localhost:3010/dashboard`);
      console.log(response);
      if (response.data === "Success") {
        setLoading(false);
        navigate("/theme");
        console.log("Successded OK");
      } else {
        setLoading(false);
        navigate("/");
      }
    })();
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.selectedItem) {
      setThemeError("Please select a theme.");
      return;
    }

    axios
      .post("http://localhost:3010/api/themes", formData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          navigate("/product-import");
        }

        setResponseMessage("Data saved successfully");
      })
      .catch((error) => {
        console.error(error);
        navigate("/theme");
        setResponseMessage("Error saving data");
      });
  };
  const handleItemClick = (item) => {
    setFormData({ ...formData, selectedItem: item });
    setThemeError('');
  };

  function redirectToXYZ() {
    const newTab = window.open(
      `https://www.jacoblevinrad.com`,
      "_blank"
    );
    newTab.focus();
  }


  return (
    <div className="container">
      {loading ? (
        <LoaderComponet loading />
      ) : null}
      <div className="container">
        <div className="row justify-content-center outer pb-0">
          <div className="col-md-12 pt-4">
            <div className="col-md-12 pb-4 mb-4">
              <div className="row justify-content-center align-items-center">
                <div className="col-md-2">
                <Link to='/'
                onClick={handleLogout}>
                  <p className="mb-0">
                  
                    <img src={Logo1} alt="not found" className="img-fluid" />
                  </p>
                  </Link>
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
                <div className="col-md-8">
                  <p className="choose">Select a Niche:</p>
                </div>
                <div className="col-md-4 text-left">
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Next
                  </button>
                </div>
              </div>
              {themeError && <p style={{ color: 'red' }}>{themeError}</p>}
              <div className="row pt-3 pb-5">
                <div className="col-md-12">
               
                  <div className="box-outer pb-5 ">
                    <ul>
                    {items.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => handleItemClick(item.name)}
                          style={{
                            border: formData.selectedItem === item.name ? "1px solid #fff" : "none",
                            cursor: "pointer",
                          }}
                        >
                          <p>
                            <img src={Uns} alt="not found" className="img-fluid" />
                          </p>
                          <p className="tech">{item.label}</p>
                        </li>
                      ))}
                    
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {responseMessage}
    </div>
  );
}
