import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/screens/Home/Home";
import Index from "./components/index";

function App() {
  return (
    
    <BrowserRouter>
    <Routes >           
        <Route element={<Index/>}>
        <Route path="/" element={<Home/>} />
      </Route>
    </Routes>
</BrowserRouter>
  );
}

export default App;
