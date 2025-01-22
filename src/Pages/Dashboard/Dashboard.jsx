import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='flex h-screen'>
            <div className='w-1/4 bg-gray-200 p-4'>

            <h2 className='text-xl font-bold mb-4'>Dashboard</h2>
            <nav>
                <ul>
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

            <div className='flex-1 p-4'>
                <Outlet></Outlet>

            </div>
            
        </div>
    );
};

export default Dashboard;