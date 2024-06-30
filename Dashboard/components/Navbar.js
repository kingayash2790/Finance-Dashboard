import React from 'react';

const Navbar = () => {
    return (
        <div className="bg-gray-900 p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Finance Dashboard</h1>
            <div className="text-white flex items-center">
                <span className="mr-4">Hello, Ralph Edwards</span>
                <button className="bg-blue-600 py-2 px-4 rounded-lg mr-2">Your card</button>
                <button className="bg-green-600 py-2 px-4 rounded-lg">Add new card</button>
            </div>
        </div>
    );
};

export default Navbar;
