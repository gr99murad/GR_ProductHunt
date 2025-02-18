import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const MainLayOut = () => {
  return (
    <div className="bg-[#e6e6e6]">
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto py-24">
        <Outlet></Outlet>
      </div>

      <div className="mt-5">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default MainLayOut;
