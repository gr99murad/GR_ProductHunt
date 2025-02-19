import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';
import axios from 'axios';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
      const fetchUserRole = async () => {
        try{
          const response = await axios.get(`https://product-hunt-server-ivory.vercel.app/users/${user.email}`)
          setRole(response.data.role);
          setLoading(false);
        }catch(error){
          console.error('Error fetching role:', error);
          setLoading(false);
        }
      };

      if(user?.email){
        fetchUserRole();
      }
    }, [user]);
    if(loading) return <p></p>;

    if(!user || !role) return <Navigate to="/login" state={{ from: location}}></Navigate>
    return (
      <div className="flex bg-[#e6e6e6] h-screen">
        <div className="w-1/4 bg-gray-200 p-4">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <nav>
            <ul>
              <li className="mb-2">
                <Link to="/">Home</Link>
              </li>
              <li className='mb-2'>
                        <Link to="myProfile">My Profile</Link> 

                    </li>

              {role === 'user' && (
                <>
                <li className='mb-2'>
                        <Link to="statistics">Overview Page</Link> 

                    </li>
                
                    <li className='mb-2'>
                        <Link to="addProduct">Add Product</Link> 

                    </li>
                    <li className='mb-2'>
                        <Link to="myProducts">My Products</Link> 

                    </li>
                
                </>
              )}
              {role === 'moderator' && (
                <>
                  <li className="mb-2">
                    <Link to="productReviewQueue">Product Review Queue</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="reportedContents">Reported Contents</Link>
                  </li>
                 
                </>
              )}
              {role === 'admin' && (
                <>
                    <li className='mb-2'>
                        <Link to="statistics">Statistics Page</Link> 

                    </li>
                    <li className='mb-2'>
                        <Link to="manageUsers">Manage Users</Link> 

                    </li>
                    <li className='mb-2'>
                        <Link to="manageCoupons">Manage Coupons</Link> 

                    </li>
                </>
              )}
              
            </ul>
          </nav>
        </div>

        <div className="flex-1 p-4">
          <Outlet></Outlet>
        </div>
      </div>
    );
};

export default Dashboard;