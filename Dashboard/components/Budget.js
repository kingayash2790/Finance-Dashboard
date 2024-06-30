import React from 'react';

const Budget = () => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg text-white">
            <h2 className="text-xl font-semibold mb-4">All Expenses</h2>
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <p>Daily</p>
                    <p>$475.53</p>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <p>Weekly</p>
                    <p>$3,325.32</p>
                </div>
                <div className="flex justify-between items-center">
                    <p>Monthly</p>
                    <p>$12,421.24</p>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-1/2 h-40 bg-purple-700 rounded-full flex items-center justify-center">
                    <p>Chart Placeholder</p>
                </div>
            </div>
        </div>
    );
};

export default Budget;
