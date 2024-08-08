import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CustomerHome = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/restaurants');
                setRestaurants(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching restaurants:', err);
                setError('Failed to fetch restaurants.');
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    const handleViewMenu = (id) => {
        navigate(`/customermenu/${id}`);
    };

    const handleMyOrders = () => {
        navigate('/myorders');
    };

    const handleLogout = () => {
        navigate('/logout');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='min-h-screen'>
            <header className="p-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 flex justify-between items-center">
                <h1 className="text-2xl font-extrabold mb-2 leading-tight">My Restaurant App</h1>
                <div>
                    <button
                        onClick={handleMyOrders}
                        className=" bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-300 mr-2"
                    >
                        My Orders
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </header>
            <div className="p-4">
                {restaurants.length === 0 ? (
                    <p>No restaurants available</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {restaurants.map((restaurant) => (
                            <div
                                key={restaurant._id}
                                className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
                            >
                                <img
                                    src={restaurant.image || 'https://via.placeholder.com/300'}
                                    alt={restaurant.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                                    <p className="text-gray-600 mb-2">{restaurant.address}</p>
                                    <p className="text-gray-600 mb-2">Cuisine: {restaurant.cuisine}</p>
                                    <p className="text-gray-600 mb-2">Phone: {restaurant.phoneNumber}</p>
                                    <p className="text-gray-600 mb-4">Rating: {restaurant.rating}</p>
                                    <button
                                        onClick={() => handleViewMenu(restaurant._id)}
                                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-300"
                                    >
                                        View Menu
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerHome;
