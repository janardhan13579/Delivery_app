import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/contextCart';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CustomerMenu = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { cart, addToCart } = useCart();
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get(`http://localhost:9000/menu/restaurant/${id}`, { withCredentials: true });
                setData(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching menu:', err);
                setLoading(false);
            }
        };
        fetchMenu();
    }, [id]);

    if (loading) return <p>Loading...</p>;

    const handleCartClick = () => {
        navigate('/cartpage'); 
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const isInCart = (itemId) => {
        return cart.some((item) => item._id === itemId);
    };

    const handleAddToCart = (item) => {
        if (isInCart(item._id)) {
            // Item already in cart, do not add again
            return;
        }
        addToCart(item);
    };

    return (
        <div className="relative p-4 min-h-screen bg-gray-100">
            <div className="fixed top-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer flex items-center justify-center z-50" onClick={handleCartClick}>
                <FaShoppingCart size={24} />
                {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        {totalItems}
                    </span>
                )}
            </div>
            
            <h2 className="text-3xl font-bold mb-4 pt-16">Menu</h2>
            {data.length === 0 ? (
                <p>No menu items available</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data.map((item) => (
                        <div
                            key={item._id}
                            className="relative bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 flex flex-col"
                        >
                            <img
                                src={item.image || 'https://via.placeholder.com/300'}
                                alt={item.name}
                                className="w-full h-44 object-cover"
                            />
                            <div className="p-4 flex-grow">
                                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                                <p className="text-gray-600 mb-2">{item.description || 'No description available'}</p>
                                <p className="text-gray-600 mb-2">Price: ${item.price}</p>
                            </div>
                            <div className="p-4 bg-gray-50 flex justify-between items-center border-t border-gray-200">
                                <button
                                    onClick={() => handleAddToCart(item)}
                                    disabled={isInCart(item._id)}
                                    className={`bg-yellow-500 text-white py-2 px-4 rounded ${isInCart(item._id) ? 'bg-yellow-300 cursor-not-allowed' : 'hover:bg-yellow-600'} transition duration-300`}
                                >
                                    {isInCart(item._id) ? 'In Cart' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomerMenu;
