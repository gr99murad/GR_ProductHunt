import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/products/${id}`)
        .then(res => setProduct(res.data))
        .catch(error => console.error('Error fetching product', error));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/products/${id}`, product)
        .then(() => {
            alert('Product updated successfully');
            navigate('/myProducts');
        })
        .catch(error => console.error('Error updating product', error));
    };

    const handleChange = (e) =>{
        setProduct({ ...product, [e.target.name]: e.target.value});
    };
    return (
        <div className='container mx-auto p-4'>
            <form onSubmit={handleUpdate}>
                <h2 className='text-2xl font-bold text-center mb-4'>Update Product</h2>
                <div className='mb-4'>
                   <label className='label'>Name:</label>
                   <input className='input input-bordered' type="text" name='name' value={product.name || ''} onChange={handleChange} />
               
                </div>
                <div className='mb-4'>
                   <label className='label'>Tags:</label>
                   <input className='input input-bordered' type="text" name='tags' value={product.tags || ''} onChange={handleChange} />
               
                </div>
                <div className='mb-4'>
                   <label className='label'>Description:</label>
                   <textarea className='textarea textarea-bordered' name='description' value={product.description || ''} onChange={handleChange} />
               
                </div>
                <div className='mb-4'>
                    <label className='label'>Status:</label>
                    <select className='select select-bordered' name="status" value={product.status || 'pending'} onChange={handleChange}>
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
                <button type='submit' className='btn btn-primary'>Update</button>
            </form>
            
        </div>
    );
};

export default UpdateProduct;