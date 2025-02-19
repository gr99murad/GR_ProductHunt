import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc'); // sorting order state
    const navigate = useNavigate();

    const fetchProducts = async (searchTerm = '', page = 1) => {
        try{
            const response = await fetch(`https://product-hunt-server-ivory.vercel.app/products?search=${searchTerm}&page=${page}&limit=6`);
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
    
    // sorting by votes
    const sortedProducts = [...products].sort((a,b) => {
      return sortOrder === 'asc' ? a.votes - b.votes : b.votes - a.votes;
    });
    return (
      <div>
        <h1 className="text-2xl font-bold text-center my-4">Products</h1>
        {/* search by tags */}
        <div className="mb-4 flex justify-center gap-4">
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

          <button className='bg-[#94776b] text-white px-4 py-2 rounded'
          
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            Sort by Votes ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
            
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
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
              <button onClick={() => navigate(`/products/${product._id}`)} className="bg-[#c1c0d8]  px-4 py-2 rounded mt-2">
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
                  ? "bg-[#94776b] text-white"
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