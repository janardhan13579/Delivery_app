import React, { useState } from 'react';
import GetRestaurant from './getRestaurent';
import AddRestaurant from './addRestaurent';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ManagerHome = () => {
    const [currentView, setCurrentView] = useState('getRestaurant');

    const handleButtonClick = (view) => {
        setCurrentView(view);
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-1/4 bg-gray-800 text-white p-4 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold mb-4">Manager Dashboard</h2>
                    <button
                        onClick={() => handleButtonClick('getRestaurant')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-2"
                    >
                        Get Restaurant
                    </button>
                    <button
                        onClick={() => handleButtonClick('addRestaurant')}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                    >
                        Add Restaurant
                    </button>
                </div>
                <div className="mt-auto">
                    <Link to='/logout'>
                        <button className=" hover:bg-red-700 text-white py-2 px-4 rounded flex items-center justify-center">
                            <FaSignOutAlt className="mr-2" />
                            Logout
                        </button>
                    </Link>
                </div>
            </div>
            <div className="w-3/4 p-4">
                {currentView === 'getRestaurant' && <GetRestaurant />}
                {currentView === 'addRestaurant' && <AddRestaurant />}
            </div>
        </div>
    );
};

export default ManagerHome;
