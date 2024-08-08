import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateRestaurant = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        cuisine: '',
        phoneNumber: '',
        rating: '',
        image: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const res = await axios.get(`http://localhost:9000/owner/${id}`, { withCredentials: true });
                const { name, address, cuisine, phoneNumber, rating, image } = res.data;
                setFormData({ name, address, cuisine, phoneNumber, rating, image: image || '' });
            } catch (err) {
                console.error('Error fetching restaurant:', err);
            }
        };
        fetchRestaurant();
    }, [id]);

    const handleChange = ({ target: { name, value } }) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:9000/owner/update/${id}`, formData, { withCredentials: true });
            toast.success('Restaurant updated successfully!');
            navigate('/manager-home');
        } catch (err) {
            console.error('Error updating restaurant:', err);
            toast.error('Failed to update restaurant');
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Update Restaurant</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                {['name', 'address', 'cuisine', 'phoneNumber', 'rating', 'image'].map(field => (
                    <div key={field} className="mb-4">
                        <label className="block text-gray-700 mb-2 capitalize">{field}</label>
                        <input
                            type={field === 'rating' ? 'number' : 'text'}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            min={field === 'rating' ? "1" : undefined}
                            max={field === 'rating' ? "5" : undefined}
                            step={field === 'rating' ? "0.1" : undefined}
                            required
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateRestaurant;
