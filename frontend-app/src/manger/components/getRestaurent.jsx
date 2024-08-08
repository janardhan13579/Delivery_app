import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const GetRestaurent = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('http://localhost:9000/owner/all', { withCredentials: true });
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const handleUpdate = (id) => {
        navigate(`/update/${id}`)
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/owner/delete/${id}`, { withCredentials: true });
            setRestaurants(restaurants.filter((restaurant) => restaurant._id !== id));
            toast.success("Deleted successfully");
        } catch (err) {
            console.log(err)
        }
    };

    const handleViewMenu = (id) => {
        navigate(`/viewmenu/${id}`);
    };

    const handleAddMenu = (id) => {
        navigate(`/add/${id}`);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">Restaurants</h2>
            {restaurants.length === 0 ? (
                <p>No restaurants available</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
                    {restaurants.map((restaurant) => (
                        <div
                            key={restaurant._id}
                            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 w-75"
                        >
                            <img
                                src={restaurant.image || 'https://via.placeholder.com/300'}
                                alt={restaurant.name}
                                className="w-full h-44 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                                <p className="text-gray-600 mb-2">{restaurant.address}</p>
                                <p className="text-gray-600 mb-2">Cuisine: {restaurant.cuisine}</p>
                                <p className="text-gray-600 mb-2">Phone: {restaurant.phoneNumber}</p>
                                <p className="text-gray-600 mb-4">Rating: {restaurant.rating}</p>
                                <div className="flex flex-col space-y-2">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleUpdate(restaurant._id)}
                                            className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition duration-300"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(restaurant._id)}
                                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleViewMenu(restaurant._id)}
                                            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-300"
                                        >
                                            View Menu
                                        </button>
                                        <button
                                            onClick={() => handleAddMenu(restaurant._id)}
                                            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition duration-300"
                                        >
                                            Add Menu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GetRestaurent;
