import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import registerLottieData from "../assets/lottie/register.json";
import AuthContext from "../context/AuthContext/AuthContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password, photoURL } = e.target.elements;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password.value)) {
      setError(
        "Password must have an uppercase letter, a lowercase letter, and at least 6 characters"
      );
      toast.error("Password must meet the requirement");
      setLoading(false);
      return;
    }

    try {
      const result = await createUser(
        email.value,
        password.value,
        name.value,
        photoURL.value
      );

      toast.success("Registration successful!");
      console.log(result.user);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="hero min-h-screen py-24 bg-white dark:bg-[#1f1f1f] transition-colors duration-300">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left w-96">
            <Lottie animationData={registerLottieData} />
          </div>
          <div className="card bg-[#d4c9c4] dark:bg-[#2d2d2d] text-black dark:text-white w-full max-w-sm shrink-0 shadow-2xl">
            <h1 className="ml-8 mt-4 text-5xl font-bold">Register Now!</h1>
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-white">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered dark:bg-[#3e3e3e] dark:text-white dark:border-gray-600"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-white">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered dark:bg-[#3e3e3e] dark:text-white dark:border-gray-600"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-white">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photoURL"
                  placeholder="Photo URL"
                  className="input input-bordered dark:bg-[#3e3e3e] dark:text-white dark:border-gray-600"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-white">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered dark:bg-[#3e3e3e] dark:text-white dark:border-gray-600"
                  required
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>

              <div className="form-control mt-6">
                <button
                  className="btn bg-[#886e63] hover:bg-[#6f584f] text-white dark:bg-[#4e4039] dark:hover:bg-[#3e322c]"
                  disabled={loading}
                >
                  {loading ? "loading..." : "Register"}
                </button>
              </div>
            </form>

            <p className="text-center mt-4 dark:text-gray-300">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 dark:text-blue-400">
                Login
              </Link>
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
