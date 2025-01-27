import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ManageCoupons = () => {

    const [coupons, setCoupons] = useState([]);
    const [couponForm, setCouponForm] = useState({
        couponCode: '',
        expiryDate: '',
        description: '',
        discountAmount: '',
    });

    const [editingCouponId, setEditingCouponId] = useState(null);


    useEffect(() => {
       
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        const {data} = await axios.get('http://localhost:5000/coupons');
        setCoupons(data);
    }

    const handleInputChange = (e) => {
        setCouponForm({
            ...couponForm,
            [e.target.name]: e.target.value,
        });
    }

    // add a coupon
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(editingCouponId){
            await axios.put(`http://localhost:5000/coupons/${editingCouponId}`, couponForm);
            setEditingCouponId(null);
        }else{
            await axios.post('http://localhost:5000/coupons', couponForm);
        }

        setCouponForm({
            couponCode: '',
            expiryDate: '',
            description: '',
            discountAmount: '',
        });
        fetchCoupons();
    };

    const handleEdit = (coupon) => {
        setCouponForm({
            couponCode: coupon.couponCode,
            expiryDate: coupon.expiryDate,
            description: coupon.description,
            discountAmount: coupon.discountAmount,
        });
        setEditingCouponId(coupon._id);
    };

    // delete a coupon
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/coupons/${id}`)
        fetchCoupons();
        

    };
    return (
        <div>
            <h1 className='text-xl font-bold text-center'>Manage Coupons</h1>
            <form onSubmit={handleSubmit}>
                <input className='input input-bordered' type="text" name='couponCode' placeholder='Coupon Code' value={couponForm.couponCode} onChange={handleInputChange} />
                <input className='input input-bordered' type="date" name='expiryDate' placeholder='Expiry Date' value={couponForm.expiryDate} onChange={handleInputChange} />
                <input className='input input-bordered' type="text" name='description' placeholder='Description' value={couponForm.description} onChange={handleInputChange} />
                <input className='input input-bordered' type="number" name='discountAmount' placeholder='Discount Amount' value={couponForm.discountAmount} onChange={handleInputChange} />

                <button type='submit'>{editingCouponId ? 'Update Coupon' : 'Add Coupon'}</button>


            </form>

            {/* coupon list */}
            <div>
                {coupons.map((coupon) => (
                    <div key={coupon._id}>
                        <h3>{coupon.couponCode}</h3>
                        <p>Expiry Date: { new Date(coupon.expiryDate).toLocaleDateString()}</p>
                        <p>{coupon.description}</p>
                        <p>Discount: {coupon.discountAmount}</p>
                        <button className='btn' onClick={() => handleEdit(coupon)}>Edit</button>
                        <button className='btn' onClick={() => handleDelete(coupon._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageCoupons;