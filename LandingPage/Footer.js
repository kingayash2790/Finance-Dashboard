import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-500 p-4 text-white text-center">
      <p>&copy; 2024 Personal Finance Dashboard. All rights reserved.</p>
      <p>
        <Link to="#" className="text-white mx-2">Privacy Policy</Link> | 
        <Link to="#" className="text-white mx-2">Terms of Service</Link>
      </p>
    </footer>
  );
};

export default Footer;
