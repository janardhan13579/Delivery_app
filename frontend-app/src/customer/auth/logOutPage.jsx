import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const LogoutPage = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:9000/user/logout', {}, { withCredentials: true });
            localStorage.removeItem('token');
            toast.success("Logged out successfully");
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error("Failed to log out");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Logout</h2>
                <p className="text-gray-700 mb-4">
                    You are about to log out of your account. Logging out will end your current session and redirect you to the login page.
                    If you wish to log back in, simply enter your credentials again.
                </p>
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default LogoutPage;
