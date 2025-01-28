import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    


    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const response = await axios.get('https://product-hunt-server-ivory.vercel.app/users');
                
                
                    setUsers(response.data);
                    setLoading(false);

                
                
            }catch(error){
                console.error('Error fetching users', error);
                setLoading(false);
            }
        };
        fetchUsers();
    },[]);

    const updateUserRole = async (email, role) => {
        try{
            const response = await axios.patch(`https://product-hunt-server-ivory.vercel.app/users/${email}/role`, {role});
            if(response.data.modifiedCount > 0){
                alert(`User role updated to ${role}`);
                setUsers((prevUsers) => 
                    prevUsers.map((user) => user.email === email ? { ...user, role} : user)
                
                );
            }

        }catch(error){
            console.error('Error updating user role', error);
        }
    };
    return (
        <div>
            <h1 className='text-xl font-bold mb-4 text-center'>Manage Users</h1>
            <table className=' w-full border border-collapse border-gray-300 '>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='border border-gray-300 px-4 py-2'>Name</th>
                        <th className='border border-gray-300 px-4 py-2'>Email</th>
                        <th className='border border-gray-300 px-4 py-2'>Role</th>
                        <th className='border border-gray-300 px-4 py-2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {users.length > 0 ? (
                        users.map((user) => (
                        
                            <tr key={user.email} className='border'>
                                <td className='border border-gray-300 px-4 py-2'>{user.name}</td>
                                <td className='border border-gray-300 px-4 py-2'>{user.email}</td>
                                <td className='border border-gray-300 px-4 py-2'>{user.role || 'user'}</td>
                                <td className='border border-gray-300 px-4 py-2 space-x-2'>
                                {user.role !== 'admin' && (
                                        <>
                                          <button className='btn bg-blue-500 text-white rounded' onClick={() => updateUserRole(user.email, 'moderator')} disabled={user.role === 'moderator'}>Make Moderator</button>

                                          <button className='btn bg-green-500 text-white px-3 py-1 rounded' onClick={() => updateUserRole(user.email, 'admin')} disabled={user.role === 'admin'}>make Admin</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))

                    ):(

                        <tr>
                            <td className='border px-4 py-2 text-center'>No users found</td>
                        </tr>
                    )}
                    
                </tbody>

            </table>
        </div>
    );
};

export default ManageUsers;