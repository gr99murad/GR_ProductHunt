import Lottie from 'lottie-react';
import React, { useContext, useState } from 'react';
import registerLottieData from '../assets/lottie/register.json';
import AuthContext from '../context/AuthContext/AuthContext';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Register = () => {
  const {createUser} = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  

    const handleRegister = async (e) =>{
        e.preventDefault();
        setLoading(true);
        const {name, email, password, photoURL} = e.target.elements;


        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if(!passwordRegex.test(password.value)){
          setError('Password must have an uppercase letter, a lowercase letter, and at least 6 characters');
          toast.error('Password must meet the requirement');
          setLoading(false);
          return;
        }

        try{
          const result = await createUser(email.value, password.value, name.value, photoURL.value)
        
          toast.success('Registration successful!');
          console.log(result.user)
        
        }
        catch(error) {
          // console.log(error.message)
          setError(error.message);
          toast.error(error.message);

        } finally{
          setLoading(false);
        }
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left w-96">
      
      <Lottie animationData={registerLottieData}></Lottie>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <h1 className=" ml-8 mt-4 text-5xl font-bold">Register Now!</h1>
      <form onSubmit={handleRegister} className="card-body">


      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name='name' placeholder="name" className="input input-bordered" required />
        </div>
     
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>


        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input type="text" name='photoURL' placeholder="Photo URL" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" disabled={loading}>{loading ? 'loading...' : 'Register'}</button>
        </div>
      </form>
      <p className='text-center mt-4'>
        Already have an account? <Link to="/login" className='text-blue-500'>Login</Link>
      </p>
    </div>
  </div>
  <ToastContainer></ToastContainer>
</div>
    );
};

export default Register;