import React from 'react';

const Accounts = () => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg text-white flex flex-col justify-between">
            <h2 className="text-xl font-semibold mb-4">Your cards</h2>
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg p-6 mb-4">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold">snazzystudio</h3>
                    <p className="text-sm">RALPH EDWARDS</p>
                    <p className="text-sm">**** **** **** 0954</p>
                </div>
                <div>
                    <p className="text-sm">Status: <span className="text-green-400">Active</span></p>
                    <p className="text-sm">Currency: USD</p>
                </div>
            </div>
            <button className="bg-blue-600 py-2 px-4 rounded-lg text-white">
                Add new card
            </button>
        </div>
    );
};

export default Accounts;
