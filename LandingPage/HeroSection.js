import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-900">
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12">
        {[...Array(12)].map((_, row) => (
          <React.Fragment key={row}>
            {[...Array(12)].map((_, col) => (
              <div key={col} className="border border-gray-700"></div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="relative z-10 text-center flex space-x-10">
        <div className="w-3/5 p-6">
          <p className="text-5xl font-semibold text-gray-400 mb-2">
            <span className="text-blue-500 text-5xl">
              Personal Finance Dashboard
            </span>{" "}
            Welcomes You
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-3xl font-bold mt-7 text-white mb-4">
            Manage your finances efficiently and effectively.
          </h1>
          <p className="text-lg text-gray-400 mb-6">
            Build beautiful landing pages for your startups, clients, and side
            projects, without having to think about design.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/signup">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Get Started
              </button>
            </Link>
          </div>
        </div>
        <div className="w-2/5 h-96">
          <img
            src="./images/finance.avif"
            alt="Finance"
            className="rounded-md object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

// import React from 'react';

// const HeroSection = () => {
//   return (
//     <div className="bg-gray-200 p-10 text-center">
//       <h1 className="text-4xl font-bold mb-4">Welcome to Your Personal Finance Dashboard</h1>
//       <p className="text-xl mb-6">Manage your finances efficiently and effectively.</p>
//       <button className="bg-blue-500 text-white px-4 py-2 rounded">Get Started</button>
//     </div>
//   );
// };

// export default HeroSection;
