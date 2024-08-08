import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateMenu = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get(`http://localhost:9000/singlemenu/${id}`, { withCredentials: true });
                const { name, description, price, image } = res.data[0];
                setFormData({ name, description, price, image: image || '' });
            } catch (err) {
                console.error('Error fetching menu item:', err);
            }
        };
        fetchMenu();
    }, [id]);

    const handleChange = ({ target: { name, value } }) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:9000/menu/update/${id}`, formData, { withCredentials: true });
            toast.success('Menu item updated successfully!');
            // navigate(`/manager-home`);
        } catch (err) {
            console.error('Error updating menu item:', err);
            toast.error('Failed to update menu item');
        } 
    };


    return (
        <div className="p-4 max-w-md mx-auto min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Update Menu Item</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                {['name', 'description', 'price', 'image'].map(field => (
                    <div key={field} className="mb-4">
                        <label className="block text-gray-700 mb-2 capitalize">{field}</label>
                        <input
                            type={field === 'price' ? 'number' : 'text'}
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
                >
                  Update
                </button>
            </form>
        </div>
    );
};

export default UpdateMenu;
