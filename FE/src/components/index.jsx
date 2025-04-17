import React from "react";
import Header from "./header/header";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Slide } from 'react-toastify';

const Index = () => {
  return (
    <div>
      <ToastContainer
        icon={false}
        position="bottom-right"
        transition={Slide}
      />
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
