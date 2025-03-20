import React from "react";
import Header from "./header/header";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";

const Index = () => {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
