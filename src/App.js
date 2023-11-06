import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PersonalDetails from "./Components/PersonalDetails";
import Theme from "./Components/Theme";
import ProductImport from "./Components/ProductImport";
import CreateStore from "./Components/CreateStore";
import Info from "./Components/Info";
import AccessKey from "./Components/AccessKey";
import Finish from "./Components/Finish";
import PageNotFound from "./Components/PageNotFound";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PersonalDetails />} />
        <Route path="/theme" element={<Theme />} />
        <Route path="/product-import" element={<ProductImport />} />
        <Route path="/create-store" element={<CreateStore />} />
        <Route path="/info-page" element={<Info />} />
        <Route path="/access-key" element={<AccessKey />} />
        <Route path="/finish" element={<Finish />} />
        <Route path="*" element={ <PageNotFound/> } />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
