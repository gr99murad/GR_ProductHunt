import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import Swal from 'sweetalert2';

const Navbar = () => {
  const {user, setOutUser} = useContext(AuthContext);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
    .then(() => {
      
      // console.log('User LOgged Out');
      // setOutUser(null);
      Swal.fire('Success', 'Logout successfully!', 'success');
    })
    .catch(error => {
      console.error(error.message);
      Swal.fire('Error',error.message , 'error');
    });
  };
  const links = (
  <>
  <li><NavLink to="/">Home</NavLink></li>
  <li><NavLink to="/products">Products</NavLink></li> 
  </>
  );
    return (
        <div className="navbar bg-base-100">
          
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">GR_Library</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    {links}
    </ul>
  </div>
  <div className="navbar-end flex gap-5">
  {!user ? (
    <>
       <NavLink to="/login"><button className='btn btn-primary'>Login</button></NavLink>
       <NavLink to="/register">Registers</NavLink>
    </>

  ):(
    <div className='dropdown dropdown-end'>
      <div className='tooltip tooltip-bottom' data-tip={user.displayName || "User"} tabIndex={0} role='button'>
        <img src={user.photoURL || 'avatar.png'} alt="User Avatar" className='w-10 h-10 rounded-full cursor-pointer' />
      </div>
      <ul tabIndex={0} className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'>
        <li className='disabled'>
          <a>{user.displayName || 'User'}</a>
        </li>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
        <button onClick={handleLogout} className='btn btn-secondary'>Logout</button>
        </li>

      </ul>

      
        
      
    </div>
  )
}

  </div>
  
</div>
    );
};

export default Navbar;