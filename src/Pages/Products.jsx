import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const fetchProducts = async (searchTerm = '', page = 1) => {
        try{
            const response = await fetch(`http://localhost:5000/products?search=${searchTerm}&page=${page}&limit=6`);
            const data = await response.json();
            if(data.products && data.totalPages !== undefined){
              setProducts(data.products);
              setTotalPages(data.totalPages);
            }else{
              console.error('Invalid APi response', data);
              setProducts([]);
              setTotalPages(1);
            }
        }catch(error){
            console.error('Error fetching products', error);
        }
    };
    useEffect(() => {
        fetchProducts(search, currentPage);
    }, [search, currentPage]);
    return (
      <div>
        <h1 className="text-2xl font-bold text-center my-4">Products</h1>
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            placeholder="Search by tags"
            className="border p-2 rounded"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow">
              <div className="flex gap-10">
                <img
                  className="w-16 h-16 rounded "
                  src={product.image}
                  alt={product.name}
                />
                <div>
                  <h3
                    className="text-xl font-semibold cursor-pointer"
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    {product.name}
                  </h3>
                  <p>{ Array.isArray(product.tags) ? product.tags.join(", ") : ''}</p>
                </div>
              </div>

              <p>{product.description}</p>
              <p>Votes: {product.votes}</p>
              <button onClick={() => navigate(`/products/${product._id}`)} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                View Details
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-1 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setCurrentPage(index + 1)}
              disabled = {currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
};

export default Products;