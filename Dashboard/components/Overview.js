import React from 'react';

const Overview = () => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg text-white">
            <h2 className="text-xl font-semibold mb-4">Your wallet</h2>
            <div className="mb-6">
                <p className="text-3xl">$2,532.60</p>
                <p className="text-green-400">+25% from last month</p>
            </div>
            <div className="flex">
                <button className="bg-blue-600 py-2 px-4 rounded-lg text-white mr-2">Send</button>
                <button className="bg-green-600 py-2 px-4 rounded-lg text-white">Receive</button>
            </div>
        </div>
    );
};

export default Overview;
