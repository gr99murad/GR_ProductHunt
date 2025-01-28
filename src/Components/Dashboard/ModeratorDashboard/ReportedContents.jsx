import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReportedContents = () => {
    const [reportedProducts, setReportedProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://product-hunt-server-ivory.vercel.app/reportedProducts')
        .then(res => res.json())
        .then(data => setReportedProducts(data))
        .catch(error => console.error('Error fetching reported products', error));
    },[]);
    const handleDelete = (id) =>{
        if(window.confirm('Are you sure! You want to delete this product?')){
            fetch(`https://product-hunt-server-ivory.vercel.app/products/${id}`, { method: 'DELETE'})
            .then(res => res.json())
            .then(data => {
                if(data.message === 'Product deleted successfully'){
                    setReportedProducts(reportedProducts.filter((product) => product._id !== id));
                    alert('Product deleted successfully');
                }else{
                    alert(data.message);
                }
            })
            .catch(error => console.error('Error deleting product:', error));
        }
    };
    // navigate product details
    const viewDetails = (id) => {
        navigate(`/products/${id}`);
    }
    return (
        <div>
            <h1 className='text-xl font-bold mb-4 text-center'>Reported Contents</h1>
            <table className=' w-full border border-collapse border-gray-300 '>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='border border-gray-300 px-4 py-2'>Product Name</th>
                        <th className='border border-gray-300 px-4 py-2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {reportedProducts.length > 0 ? (
                        reportedProducts.map((product) => (
                        
                            <tr key={product._id} className='border'>
                                <td className='border border-gray-300 px-4 py-2'>{product.name}</td>
                                <td className='border border-gray-300 px-4 py-2 space-x-2'>
                                    <button className='btn' onClick={() => viewDetails(product._id)}>View Details</button>

                                    <button className='btn bg-red-500 text-white px-3 py-1 rounded' onClick={() => handleDelete(product._id)}>Delete</button>
                                </td>
                            </tr>
                        ))

                    ):(

                        <tr>
                            <td className='border px-4 py-2 text-center'>No reported Products found</td>
                        </tr>
                    )}
                    
                </tbody>

            </table>
        </div>
    );
};

export default ReportedContents;