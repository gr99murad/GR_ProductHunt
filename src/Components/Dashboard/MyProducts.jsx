import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(user && user.id){
            setLoading(true);

            axios.get(`http://localhost:5000/myProducts/${user.uid}`)
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products', error);
                setLoading(false);
            });
        } else{
            setLoading(false);
        }
    }, [user]);

    const handleUpdate = (id) => {
        navigate(`/updateProduct/${id}`);
    }

    const handleDelete = (id) => {
       if (window.confirm('Are you sure! You Want to delete this product?')){
        axios.delete(`http://localhost:5000/products/${id}`)
        .then(() => setProducts( products.filter(product => product._id !== id)))
        .catch(error => console.error('Error deleting product', error));
       }
    };

    if(loading){
        return <div>Loading...</div>
    }

    return (
        <div className='container mx-auto p-4'>
            <h2 className='text-2xl font-bold text-center mb-4'>My Products</h2>
            <table className='table-auto w-full border-collapse border border-gray-400'>
                <thead>
                    <tr>
                        <th className='border border-gray-300 px-4 py-2'>Product Name</th>
                        <th className='border border-gray-300 px-4 py-2'>Votes</th>
                        <th className='border border-gray-300 px-4 py-2'>Status</th>
                        <th className='border border-gray-300 px-4 py-2'>Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td className='border border-gray-300 px-4 py-2'>{product.name}</td>
                            <td className='border border-gray-300 px-4 py-2'>{product.votes}</td>
                            <td className='border border-gray-300 px-4 py-2'>{product.status || 'pending'}</td>
                            <td className='border border-gray-300 px-4 py-2'>
                                <button className='btn' onClick={() => handleUpdate(product._id)}>Update</button>
                                <button className='btn' onClick={() => handleDelete(product._id)}>Delete</button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
};

export default MyProducts;