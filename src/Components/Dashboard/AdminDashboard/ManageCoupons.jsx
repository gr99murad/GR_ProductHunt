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
        const { data } = await axios.get('https://product-hunt-server-ivory.vercel.app/coupons');
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

        if (editingCouponId) {
            await axios.put(`https://product-hunt-server-ivory.vercel.app/coupons/${editingCouponId}`, couponForm);
            setEditingCouponId(null);
        } else {
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
        <div className="dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-md">
            <h1 className="text-xl font-bold text-center py-4">Manage Coupons</h1>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <input
                    className="input input-bordered dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    type="text"
                    name="couponCode"
                    placeholder="Coupon Code"
                    value={couponForm.couponCode}
                    onChange={handleInputChange}
                    required
                />
                <input
                    className="input input-bordered dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    type="date"
                    name="expiryDate"
                    placeholder="Expiry Date"
                    value={couponForm.expiryDate}
                    onChange={handleInputChange}
                    required
                />
                <input
                    className="input input-bordered dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={couponForm.description}
                    onChange={handleInputChange}
                    required
                />
                <input
                    className="input input-bordered dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    type="number"
                    name="discountAmount"
                    placeholder="Discount Amount"
                    value={couponForm.discountAmount}
                    onChange={handleInputChange}
                    required
                />
                <button className="btn dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white" type="submit">
                    {editingCouponId ? 'Update Coupon' : 'Add Coupon'}
                </button>
            </form>

            {/* coupon list */}
            <div className="mt-5">
                {coupons.map((coupon) => (
                    <div key={coupon._id} className="p-4 mb-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">{coupon.couponCode}</h3>
                        <p>Expiry Date: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
                        <p>{coupon.description}</p>
                        <p>Discount: {coupon.discountAmount}</p>
                        <div className="flex gap-2">
                            <button className="btn dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:text-white" onClick={() => handleEdit(coupon)}>
                                Edit
                            </button>
                            <button className="btn dark:bg-red-500 dark:hover:bg-red-600 dark:text-white" onClick={() => handleDelete(coupon._id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageCoupons;
