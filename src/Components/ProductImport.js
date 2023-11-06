import React, { useState, useEffect } from "react";
import Logo1 from "../Asset/Images/Gp.png";
import "../Asset/App.css";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import LoaderComponet from './LoderComponent'
import Cookies from "js-cookie";

export default function ProductImport() {
  
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate('/')
   }

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    selectedItem: "",
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
    setError('');
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axios.get(`http://ai-accelerator.io:3010/dashboard`);
      console.log(response);
      if (response.data === "Success") {
        setLoading(false);
        navigate("/product-import");
        console.log("Successded OK");
      } else {
        setLoading(false);
        navigate("/");
      }
    })();
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.importProduct && !formData.notImportProduct) {
      setError('Please tick one of them.');
    } else {
      // If at least one checkbox is checked, proceed with the form submission
      axios
        .post("http://ai-accelerator.io:3010/api/products", formData)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            navigate("/create-store");
          }
          console.log("Data saved successfully");
        })
        .catch((error) => {
          console.error(error);
          navigate("/theme");
          console.log("Error saving data");
        });
    }
  };

  function redirectToXYZ() {
    const newTab = window.open(
      `https://www.jacoblevinrad.com`,
      "_blank"
    );
    newTab.focus();
  }

  return (
    <div className="content  container-fluid">
      {loading ? (
        <LoaderComponet loading />
      ) : (" ")}
      <div className="container  container-fluid">
        <div className="row justify-content-center outer1 pb-0">
          <div className="col-md-12 pt-4">
            <div className="col-md-12 pb-5 mb-5">
              <div className="row justify-content-center align-items-center">
                <div className="col-md-2">
                  <p className="mb-0">
                  <Link to="/"onClick={handleLogout}>
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
            <h1 className="col-lg-10 d-flex flex-column text-white justify-content-center c-products_h1">
              DO You Want To Import The Products?
            </h1>
          </div>
          <div className="col-md-12 d-flex flex-column ">
            <form onSubmit={handleSubmit}>
              <div>

                <div>
                  <label class="custom-checkbox">
                    <input type="checkbox"
                      name="importProduct"
                      checked={formData.importProduct}
                      onChange={handleChange} />
                    <span class="checkmark"></span>
                    Yes
                  </label>
                </div>
                <div>
                  <label class="custom-checkbox">
                    <input type="checkbox"
                      name="notImportProduct"
                      checked={formData.notImportProduct}
                      onChange={handleChange} />
                    <span class="checkmark"></span>
                    No
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div className="productImpNxtBtn">
          {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className="btn btn-primary" onClick={handleSubmit}>
              Next
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
