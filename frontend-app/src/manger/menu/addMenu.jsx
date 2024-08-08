import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const AddMenu = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        restaurantId: id,
        name: '',
        description: '',
        price: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = ({ target: { name, value } }) => setFormData(prev => ({ ...prev, [name]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:9000/menu/add', formData, { withCredentials: true });
            toast.success('Menu item added successfully!');
            setFormData({
                restaurantId: id,
                name: '',
                description: '',
                price: '',
            });
            navigate(`/viewmenu/${id}`);
        } catch (err) {
            console.error('Error adding menu item:', err);
            toast.error('Failed to add menu item');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Add Menu Item</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                {['name', 'description', 'price'].map(field => (
                    <div key={field} className="mb-4">
                        <label className="block text-gray-700 mb-2 capitalize">{field}</label>
                        <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Menu Item'}
                </button>
            </form>
        </div>
    );
};

export default AddMenu;
