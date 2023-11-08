import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./Components/PageNotFound";
import Screen1 from "./Components/Screen1";
import Screen2 from "./Components/Screen2";
import Screen3 from "./Components/Screen3";
import Screen4 from "./Components/Screen4";
import Screen5 from "./Components/Screen5";
import Screen6 from "./Components/Screen6";
import Screen7 from "./Components/Screen7";
import Screen8 from "./Components/Screen8";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Screen1 />} />
        <Route path="/s2" element={<Screen2 />} />
        <Route path="/s3" element={<Screen3 />} />
        <Route path="/s4" element={<Screen4 />} />
        <Route path="/s5" element={<Screen5 />} />
        <Route path="/s6" element={<Screen6 />} />
        <Route path="/s7" element={<Screen7 />} />
        <Route path="/s8" element={<Screen8 />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
