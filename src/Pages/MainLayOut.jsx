import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";


const MainLayOut = () => {
 
  return (
    <div className="bg-white dark:bg-gray-900">
        
      <Navbar></Navbar>
      
      
     

      <div className="max-w-7xl px-7 mx-auto py-24 ">
        
        <Outlet></Outlet>
      </div>

      <div className="mt-5">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default MainLayOut;
