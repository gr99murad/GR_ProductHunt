import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import './MainLayout.css';

const MainLayOut = () => {
    const [theme,setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    },[theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    }
  return (
    <div className="bg-[#e6e6e6]">
        
      <Navbar></Navbar>
      
      <button onClick={toggleTheme} className='theme-toggle-btn mt-32 mr-96'>Switch to {theme === 'light' ? 'Dark' : 'light'} Mode</button>
     

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
