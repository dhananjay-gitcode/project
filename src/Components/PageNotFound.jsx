import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../Asset/AI.css";
const PageNotFound = () => {
  return (
    <div className='notFoundPage'>
  <h1 className='text-white'>Page Not Found</h1>
  <p>The page you requested could not be found.</p>
  <a href="/">Go back to Home</a>
</div>
  );
};

export default PageNotFound;
