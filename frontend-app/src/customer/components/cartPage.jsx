import React from 'react';
import { useCart } from '../../context/contextCart';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartPage = () => {
    const { cart, removeFromCart, clearCart, updateQuantity, getTotalPrice } = useCart();
    const navigate = useNavigate(); 

    const handleQuantityChange = (itemId, change) => {
        updateQuantity(itemId, change);
    };

    const placeOrder = async () => {
        try {
            const orderDetails = {
                restaurantName: 'Your Restaurant Name', // Replace with actual restaurant name
                items: cart.map(item => ({
                    menuItemId: item._id,
                    quantity: item.quantity
                })),
            };

            await axios.post('http://localhost:9000/order/create', orderDetails, { withCredentials: true });
            clearCart();
            navigate('/orderpage'); // Navigate to order confirmation or details page
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className="p-4 min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
            {cart.length === 0 ? (
                <p className="text-center text-gray-600">Your cart is empty</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div key={item._id} className="flex items-center justify-between p-4 border-b border-gray-300 bg-white shadow-sm rounded-lg mb-4">
                            <div className="flex items-center">
                                <img
                                    src={item.image || 'https://via.placeholder.com/100'}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-full mr-4"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                    <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                                    <div className="flex items-center mt-2">
                                        <button
                                            onClick={() => handleQuantityChange(item._id, -1)}
                                            disabled={item.quantity <= 1}
                                            className="bg-gray-300 text-gray-800 py-1 px-2 rounded-l hover:bg-gray-400 transition duration-300"
                                        >
                                            -
                                        </button>
                                        <span className="px-3">{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item._id, 1)}
                                            className="bg-gray-300 text-gray-800 py-1 px-2 rounded-r hover:bg-gray-400 transition duration-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => removeFromCart(item._id)}
                                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="bg-white p-4 border-t border-gray-300 mt-4">
                        <div className="flex justify-between mb-2">
                            <span className="text-lg font-semibold">Total</span>
                            <span className="text-lg font-semibold">${getTotalPrice()}</span>
                        </div>
                        <button
                            onClick={clearCart}
                            className="bg-red-600 text-white py-2 px-4 mb-5 rounded hover:bg-red-700 transition duration-300"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
            )}
            <button
                onClick={placeOrder}
                className="mt-5 ml-85 w-40 block text-center bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
            >
                Place Order
            </button>
        </div>
    );
};

export default CartPage;
