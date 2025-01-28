import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({
        name: '',
        tags: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch (`https://product-hunt-server-ivory.vercel.app/products/${id}`);
            const data = await response.json();
            setProduct(data);
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`https://product-hunt-server-ivory.vercel.app/products/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product),
        });

        const data = await response.json();
        if(data.message === 'Product updated successfully'){
            alert('Product updated successfully');
        }else{
            alert('Error updating product');
            console.error('Error updating product');
        }
    };
    return (
        <div className='container mx-auto p-4'>
            <form onSubmit={handleSubmit}>
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
                
                
                <button type='submit' className='btn btn-primary'>Update</button>
            </form>
            
        </div>
    );
};

export default UpdateProduct;