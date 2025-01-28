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
        const {data} = await axios.get('https://product-hunt-server-ivory.vercel.app/coupons');
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
            await axios.put(`https://product-hunt-server-ivory.vercel.app/coupons/${editingCouponId}`, couponForm);
            setEditingCouponId(null);
        }else{
            await axios.post('https://product-hunt-server-ivory.vercel.app/coupons', couponForm);
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
        await axios.delete(`https://product-hunt-server-ivory.vercel.app/coupons/${id}`)
        fetchCoupons();
        

    };
    return (
        <div>
            <h1 className='text-xl font-bold text-center'>Manage Coupons</h1>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                <input className='input input-bordered' type="text" name='couponCode' placeholder='Coupon Code' value={couponForm.couponCode} onChange={handleInputChange} required />
                <input className='input input-bordered' type="date" name='expiryDate' placeholder='Expiry Date' value={couponForm.expiryDate} onChange={handleInputChange} required/>
                <input className='input input-bordered' type="text" name='description' placeholder='Description' value={couponForm.description} onChange={handleInputChange} required/>
                <input className='input input-bordered' type="number" name='discountAmount' placeholder='Discount Amount' value={couponForm.discountAmount} onChange={handleInputChange} required />

                <button className='btn' type='submit'>{editingCouponId ? 'Update Coupon' : 'Add Coupon'}</button>


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