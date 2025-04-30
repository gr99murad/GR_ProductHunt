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
      try {
        const response = await axios.get(`https://product-hunt-server-ivory.vercel.app/users/${user.email}`);
        setRole(response.data.role);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching role:', error);
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchUserRole();
    }
  }, [user]);

  if (loading) return <p className="text-center text-gray-500 dark:text-gray-300">Loading...</p>;

  if (!user || !role) return <Navigate to="/login" state={{ from: location }} />;

  return (
    <div className="flex min-h-screen bg-[#e6e6e6] dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <div className="w-full sm:w-1/4 bg-gray-200 dark:bg-gray-800 p-4 border-r border-gray-300 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <Link to="/" className="hover:text-primary">Home</Link>
            </li>
            <li className="mb-2">
              <Link to="myProfile" className="hover:text-primary">My Profile</Link>
            </li>

            {role === 'user' && (
              <>
                <li className="mb-2">
                  <Link to="statistics" className="hover:text-primary">Overview Page</Link>
                </li>
                <li className="mb-2">
                  <Link to="addProduct" className="hover:text-primary">Add Product</Link>
                </li>
                <li className="mb-2">
                  <Link to="myProducts" className="hover:text-primary">My Products</Link>
                </li>
              </>
            )}

            {role === 'moderator' && (
              <>
                <li className="mb-2">
                  <Link to="productReviewQueue" className="hover:text-primary">Product Review Queue</Link>
                </li>
                <li className="mb-2">
                  <Link to="reportedContents" className="hover:text-primary">Reported Contents</Link>
                </li>
              </>
            )}

            {role === 'admin' && (
              <>
                <li className="mb-2">
                  <Link to="statistics" className="hover:text-primary">Statistics Page</Link>
                </li>
                <li className="mb-2">
                  <Link to="manageUsers" className="hover:text-primary">Manage Users</Link>
                </li>
                <li className="mb-2">
                  <Link to="manageCoupons" className="hover:text-primary">Manage Coupons</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
