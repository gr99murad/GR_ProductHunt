import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import "./MainLayout.css";

const Navbar = () => {
  // dark mode
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAboutUs = () => {
    const aboutSection = document.getElementById("aboutUs");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        <NavLink
          to="/"
          className="dark:text-white hover:text-primary dark:hover:text-primary"
        >
          Home
        </NavLink>
      </li>
      <li>
        <button
          onClick={scrollToAboutUs}
          className="text-text hover:text-primary dark:text-white dark:hover:text-primary"
        >
          About
        </button>
      </li>
      <li>
        <button
          onClick={scrollToContact}
          className="text-text hover:text-primary dark:text-white dark:hover:text-primary"
        >
          Contact
        </button>
      </li>
      <li>
        <NavLink
          to="/products"
          className="dark:text-white hover:text-primary dark:hover:text-primary"
        >
          Products
        </NavLink>
      </li>
      {user && (
        <li>
          <Link
            to="/profile"
            className="text-text hover:text-primary dark:text-white dark:hover:text-primary"
          >
            My Profile
          </Link>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-white dark:bg-gray-900 fixed top-0 w-full z-50 shadow-lg">
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
              className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 rounded-box z-50 mt-3 w-52 p-4 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl dark:text-white">
            GR_ProductHunt
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <button
            onClick={toggleTheme}
            className="dark:text-white hover:text-primary dark:hover:text-primary"
          >
            <label className="flex cursor-pointer gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <input
                type="checkbox"
                value="synthwave"
                className="toggle theme-controller"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
            
          </button>

          {!user ? (
            <div className="flex gap-6">
              <Link
                to="/login"
                className="btn btn-outline bg-primary text-white hover:bg-primary/80"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-outline dark:text-white dark:border-white"
              >
                Register
              </Link>
            </div>
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
                  alt="Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer border dark:border-white"
                />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 rounded-box z-50 mt-3 w-52 p-4 shadow"
              >
                <li className="disabled">
                  <a className="dark:text-white">{user.displayName}</a>
                </li>
                <li>
                  <NavLink
                    to="/dashboard"
                    className="dark:text-white hover:text-primary dark:hover:text-primary"
                  >
                    Dashboard
                  </NavLink>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="btn bg-[#8a899f] dark:text-white"
                  >
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
