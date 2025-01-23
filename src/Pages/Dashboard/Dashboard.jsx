import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    const isModerator = user?.role === 'moderator';
    return (
      <div className="flex h-screen">
        <div className="w-1/4 bg-gray-200 p-4">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <nav>
            <ul>
              <li className="mb-2">
                <Link to="/">Home</Link>
              </li>
              {isModerator && (
                <>
                  <li className="mb-2">
                    <Link to="productReviewQueue">Product Review Queue</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="reportedContents">Reported Contents</Link>
                  </li>
                 
                </>
              )}
              <li className='mb-2'>
                        <Link to="myProfile">My Profile</Link> 

                    </li>
                    <li className='mb-2'>
                        <Link to="addProduct">Add Product</Link> 

                    </li>
                    <li className='mb-2'>
                        <Link to="myProducts">My Products</Link> 

                    </li>
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