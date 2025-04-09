import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing core components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Detect from "./pages/Detect";

function App() {
  return (
    <Router>
      {/* Persistent navigation bar */}
      <Navbar />
      
      {/* Defining routes for different pages */}
      <Routes>
        <Route path="/" element={<Home />} />           {/* Home page route */}
        <Route path="/detect" element={<Detect />} />   {/* Detection page route */}
      </Routes>
    </Router>
  );
}

export default App;
