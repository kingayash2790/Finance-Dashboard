import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Overview from '../components/Overview';
import Budget from '../components/Budget';
import Insights from '../components/Insights';
import Accounts from '../components/Accounts';
import Transactions from '../components/Transactions';

const Dashboard = () => {
    return (
        <div className="bg-gray-900 min-h-screen flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
                    <Overview />
                    <Budget />
                    <Insights />
                    <Accounts />
                    <Transactions />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
