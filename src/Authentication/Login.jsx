import React, { useContext, useState } from 'react';
import Lottie from 'lottie-react';
import loginLottieData from '../assets/lottie/login.json';
import AuthContext from '../context/AuthContext/AuthContext';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import auth from '../Firebase/firebase.init';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaGoogle } from 'react-icons/fa';
import Navbar from '../Components/Navbar';

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = e.target.elements;

    try {
      await signInUser(email.value, password.value);
      Swal.fire('Success', 'Login successful!', 'success');
      navigate('/');
    } catch (error) {
      setError(error.message);
      Swal.fire('Error', error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);

    try {
      await signInWithPopup(auth, provider);
      Swal.fire('Success', 'Google Login successful!', 'success');
      navigate('/');
    } catch (error) {
      setError(error.message);
      Swal.fire('Error', error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="hero py-24 min-h-screen bg-white dark:bg-gray-900 transition-all duration-300">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left w-96">
            <Lottie animationData={loginLottieData} />
          </div>
          <div className="card bg-[#eae4e1] dark:bg-gray-800 w-full max-w-sm shrink-0 shadow-2xl">
            <h1 className="ml-8 mt-4 text-5xl font-bold text-black dark:text-white">
              Sign In Now!
            </h1>
            <form onSubmit={handleSignIn} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black dark:text-white">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black dark:text-white">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered dark:bg-gray-700 dark:text-white"
                  required
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-[#886e63] text-white" disabled={loading}>
                  {loading ? 'Loading...' : 'Login'}
                </button>
              </div>
            </form>

            <div className="text-center mt-4">
              <button
                onClick={handleGoogleSignIn}
                className="btn bg-[#bea7a7] text-black dark:text-white"
                disabled={loading}
              >
                {loading ? (
                  'Loading...'
                ) : (
                  <>
                    <FaGoogle className="text-xl" />
                    <span>Sign in with Google</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-center mt-4 text-black dark:text-white">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-500 dark:text-blue-400">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
