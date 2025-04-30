import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const roles = ['user', 'moderator', 'admin'];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://product-hunt-server-ivory.vercel.app/users');
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users', error);
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, role) => {
        try {
            const response = await axios.patch(`https://product-hunt-server-ivory.vercel.app/users/${userId}/role`, { role });
            if (response.data.modifiedCount > 0) {
                setUsers(prevUsers =>
                    prevUsers.map(user => user._id === userId ? { ...user, role } : user)
                );
                alert(`User role updated to ${role}`);
            }
        } catch (error) {
            console.error('Error updating user role', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const response = await axios.delete(`https://product-hunt-server-ivory.vercel.app/users/${userId}`);
            if (response.data.deletedCount > 0) {
                setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
                alert('User deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };

    return (
        <div className="p-5 dark:bg-gray-900 dark:text-white min-h-screen">
            <h3 className="text-xl font-bold mb-4">Manage Users</h3>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border dark:border-gray-600">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-800">
                            <th className="border px-4 py-2 dark:border-gray-600">#</th>
                            <th className="border px-4 py-2 dark:border-gray-600">Name</th>
                            <th className="border px-4 py-2 dark:border-gray-600">Email</th>
                            <th className="border px-4 py-2 dark:border-gray-600">Role</th>
                            <th className="border px-4 py-2 dark:border-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user._id} className="dark:bg-gray-700">
                                    <td className="border px-4 py-2 dark:border-gray-600">{index + 1}</td>
                                    <td className="border px-4 py-2 dark:border-gray-600">{user.name}</td>
                                    <td className="border px-4 py-2 dark:border-gray-600">{user.email}</td>
                                    <td className="border px-4 py-2 dark:border-gray-600">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            className="border px-2 py-1 rounded dark:bg-gray-800 dark:border-gray-600"
                                        >
                                            {roles.map(role => (
                                                <option key={role} value={role}>{role}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="border px-4 py-2 text-center dark:border-gray-600">
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="border px-4 py-2 text-center dark:border-gray-600" colSpan="5">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
