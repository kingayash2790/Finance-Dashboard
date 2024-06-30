import React from 'react';

const Insights = () => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg text-white">
            <h2 className="text-xl font-semibold mb-4">Wallet history</h2>
            <div className="flex justify-between items-center mb-4">
                <button className="py-1 px-3 bg-blue-500 rounded-full text-white">1 Week</button>
                <button className="py-1 px-3 bg-transparent text-gray-400">1 Month</button>
                <button className="py-1 px-3 bg-transparent text-gray-400">6 Month</button>
                <button className="py-1 px-3 bg-transparent text-gray-400">12 Month</button>
            </div>
            <div className="h-40 bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Chart goes here</p>
            </div>
        </div>
    );
};

export default Insights;
