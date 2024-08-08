import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddRestaurent = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        cuisine: '',
        phoneNumber: '',
        rating: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = ({ target: { name, value } }) => setFormData(prev => ({ ...prev, [name]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:9000/owner/add', formData, { withCredentials: true });
            toast.success('Restaurant added successfully!');
            setFormData({
                name: '',
                address: '',
                cuisine: '',
                phoneNumber: '',
                rating: '',
            });
            navigate('/manager-home');
        } catch (err) {
            console.error('Error adding restaurant:', err);
            toast.error('Failed to add restaurant');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add Restaurant</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                {['name', 'address', 'cuisine', 'phoneNumber'].map(field => (
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
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Rating</label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-lg"
                        min="1"
                        max="5"
                        step="0.1"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Restaurant'}
                </button>
            </form>
        </div>
    );
};

export default AddRestaurent;
