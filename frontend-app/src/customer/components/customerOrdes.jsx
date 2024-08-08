import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:9000/order/get/order', { withCredentials: true });
                setOrders(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4 min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold mb-4">My Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found</p>
            ) : (
                <div>
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 mb-4 p-4">
                            <h3 className="text-xl font-semibold mb-2">Order from {order.restaurantName}</h3>
                            <p className="text-gray-600 mb-2">Total Price: ${order.totalPrice.toFixed(2)}</p>
                            <p className="text-gray-600 mb-2">Status: {order.status}</p>
                            <p className="text-gray-600 mb-2">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                            <h4 className="text-lg font-semibold mb-2">Items:</h4>
                            <ul>
                                {order.items.map((item) => (
                                    <li key={item._id} className="text-gray-600">
                                        Item ID: {item.menuItemId}, Quantity: {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrdersPage;
