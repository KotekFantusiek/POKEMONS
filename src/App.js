import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Docs from "./Docs";
import Home from "./Home";
import Items from "./Items";


function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </Router>
  );
}

export default App;
