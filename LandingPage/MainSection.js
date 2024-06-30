import React from "react";
import MainCard from "./MainCard";

const MainSection = () => {
  return (
    <div className="bg-black text-white p-10">
      <h2 className="text-3xl text-center font-bold mb-8">Features</h2>
      {/* <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-6 rounded">
          <h3 className="text-xl font-bold mb-2">Track Expenses</h3>
          <p>Monitor your spending habits and manage your budget effectively.</p>
        </div>
        <div className="bg-gray-100 p-6 rounded">
          <h3 className="text-xl font-bold mb-2">Investment Insights</h3>
          <p>Get insights into your investments and maximize your returns.</p>
        </div>
        <div className="bg-gray-100 p-6 rounded">
          <h3 className="text-xl font-bold mb-2">Savings Goals</h3>
          <p>Set and achieve your savings goals with ease.</p>
        </div>
      </div> */}
      <div className="flex space-x-8 items-center justify-center">
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
      </div>
    </div>
  );
};

export default MainSection;
