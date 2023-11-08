import React, { useState } from 'react'
import Logo1 from "../Asset/Images/Gp.png";
import "../Asset/App.css";
import axios from "axios";
import LoaderComponet from './LoderComponent'
import { Link ,useNavigate} from 'react-router-dom';
import Cookies from "js-cookie";
export default function Finish() {

  const [loading,setLoading]= useState(false)

  const navigate = useNavigate();
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

  const handleLogout = () => {
    Cookies.remove("token");
    navigate('/')
   }

  function redirectToXYZ() {
    const newTab = window.open(
      `https://www.jacoblevinrad.com`,
      "_blank"
    );
    newTab.focus();
  }

  return (
    <div className="content">
       {loading ? (
        <LoaderComponet loading={loading} />
      ) : null}
      <div className="container  container-fluid">
        <div className="row justify-content-center outer1 pb-0">
          <div className="col-md-12 pt-4">
            <div className="col-md-12 pb-5 mb-5">
              <div className="row justify-content-center align-items-center">
                <div className="col-md-2">
                  <p className="mb-0">
                    <Link to="/" onClick={handleLogout}>
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
            <h1 className="text-white text-center">You are all set...</h1>
            <p className="text-white text-center">
              Now You Can check Your Store On Shopify By Click On Button Below
            </p>

            <div className='h-100 d-flex align-items-center justify-content-center text-center'>
            <button className='btn btn-primary'
            onClick={accessShopifyStore}>Visit Your Shopify Store</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
