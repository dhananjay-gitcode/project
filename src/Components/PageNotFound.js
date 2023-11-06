import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../Asset/App.css";
const PageNotFound = () => {
  return (
    <div className='notFoundPage'>
    <div className='text-align: center'>
  <h1 className='text-white'>Page Not Found</h1>
  <p>The page you requested could not be found.</p>
  <a href="/">Go back to Home</a>
</div>
</div>
  );
};

export default PageNotFound;
