import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOutUser();
      Swal.fire("Success", "Logout successfully!", "success");
    } catch (error) {
      console.error(error.message);
      Swal.fire("Error", error.message, "error");
    }
  };
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/products">Products</NavLink>
      </li>
    </>
  );
  return (
    <div className=" bg-[#cccccc] fixed top-0 w-full z-50 shadow-lg ">
      <div className="navbar max-w-7xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-4 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">GR_ProductHunt</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {!user ? (
          <>
            <NavLink to="/login">
              <button className="btn btn-primary">Login</button>
            </NavLink>
            <NavLink to="/register">Registers</NavLink>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              className="tooltip tooltip-bottom"
              tabIndex={0}
              role="button"
              aria-label="User Menu"
            >
              <img
                src={user.photoURL || "avatar.png"}
                alt=" Avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-4 shadow"
            >
              <li className="disabled">
                <a>{user.displayName}</a>
              </li>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Navbar;
