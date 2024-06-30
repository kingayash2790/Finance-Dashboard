import React from 'react';

const Transactions = () => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg text-white">
            <h2 className="text-xl font-semibold mb-4">Recent transactions</h2>
            <div className="mb-4">
                <div className="flex justify-between items-center">
                    <p>Spotify</p>
                    <p className="text-green-400">+$52.00</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p>Figma</p>
                    <p className="text-red-400">-$121.00</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p>Other Transaction</p>
                    <p className="text-red-400">-$30.00</p>
                </div>
            </div>
        </div>
    );
};

export default Transactions;
  