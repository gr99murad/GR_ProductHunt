import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WithContext as ReactTags } from 'react-tag-input';

const AddProduct = () => {

    const {user} = useContext(AuthContext);
    const [productName, setProductName] = useState('');
    const [productImage, setProductImage] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [externalLink, setExternalLink] = useState('');
    const navigate = useNavigate();

    const keyCodes = {
        comma: 188,
        enter: 13,
    };
    const delimiters = [keyCodes.comma, keyCodes.enter];

    const handleAddition = (tag) => setTags([...tags, tag]);
    const handleDelete = (i) => setTags(tags.filter((_, index) => index !== i));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!productName || !productImage || !description){
            toast.error('All required fields must be filled');
            return;
        }

        const productData = {
            name: productName,
            image: productImage,
            description,
            owner: {
                name: user.name,
                email: user.email,
                image: user.image,
            },
            tags: tags.map(tag => tag.text),
            link: externalLink,
        };

        try{
            const response = await fetch('http://localhost:5000/products',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(productData),
            });

            const result = await response.json();
            if(response.ok){
                toast.success('Product added successfully!');
                navigate('/dashboard/myProducts');
            } else{
                toast.error(result.message || 'Failed to add product!');
            }

        }catch(error){
            console.error(error);
            toast.error('An error occurred while adding the product!');


        }
    }
    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4 text-center'>Add Product</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block font-medium'>Product Name *</label>
                    <input type="text" className='w-full p-2 border rounded' value={productName} onChange={(e) => setProductName(e.target.value)} required/>
                </div>
                <div>
                    <label className='block font-medium'>Product Image URL *</label>
                    <input type="url" className='w-full p-2 border rounded' value={productImage} onChange={(e) => setProductImage(e.target.value)} required/>
                </div>
                <div>
                    <label className='block font-medium'>Description *</label>
                    <textarea className='w-full p-2 border rounded' rows='4' value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>

                <div>
                    <label className='block font-medium'>Tags</label>
                    <ReactTags
                    
                    tags={tags}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    delimiters={delimiters}
                    placeholder='Add a tag and press Enter'
                    >

                    </ReactTags>
                </div>
                <div>
                    <label className='block font-medium'>External Link</label>
                    <input type="url" className='w-full p-2 border rounded' value={externalLink} onChange={(e) => setExternalLink(e.target.value)} />
                </div>
                <div>
                    <label className='block font-medium'>Owner Info</label>
                    <input type="text" className='w-full p-2 border rounded' value={user.displayName} disabled />
                    <img className='w-16 h-16 rounded my-4' src={user.photoURL} alt="" />
                    <input type="email" className='w-full p-2 border rounded mt-2' value={user.email} disabled />

                </div>

                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Submit</button>
            </form>
            
        </div>
    );
};

export default AddProduct;