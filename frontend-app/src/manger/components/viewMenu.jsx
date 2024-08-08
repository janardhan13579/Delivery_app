
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewMenu = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
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

    const handleDelete = async (itemId) => {
        try {
            await axios.delete(`http://localhost:9000/menu/delete/${itemId}`, { withCredentials: true });
            setData(data.filter(item => item._id !== itemId));
        } catch (err) {
            console.error('Error deleting menu item:', err);
        }
    };

    const handleUpdate = (itemId) => {
        navigate(`/updatemenu/${itemId}`);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-4 min-h-screen">
            <h2 className="text-2xl font-bold mb-2">Menu</h2>
            {data.length === 0 ? (
                <p>No menu items available</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                                <p className="text-gray-600 mb-2">{item.description}</p>
                                <p className="text-gray-600 mb-2">Price: {item.price}</p>
                            </div>
                            <div className=" p-4 bg-white flex justify-between space-x-2">
                                <button
                                    onClick={() => handleUpdate(item._id)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition duration-300"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ViewMenu;
