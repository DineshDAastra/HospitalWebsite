import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/screens/Home/Home";
import Login from "./components/screens/Login/Login";
import Approved from "./components/screens/Request/Approved";
import Index from "./components/index";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={1000} />
      <Routes>
        <Route element={<Index />}>
          <Route path="/" element={<Home />} />
          <Route path="/approved" element={<Approved />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
