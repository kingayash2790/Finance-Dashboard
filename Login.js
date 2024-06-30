import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = user;
      const response = await axios.post('http://localhost:9002/login', user);
      const { userId, token } = response.data; // Assuming your API response includes userId and token
      console.log(userId);
      localStorage.setItem('userId', userId); // Store the token in localStorage
      localStorage.setItem('token', token); // Store the token in localStorage
      alert('Login successful!');
      navigate('/dashboard');
      console.log(userId);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Invalid credentials.'); // Display alert for wrong password
      } else {
        alert('Error logging in. Please try again later.'); // Display alert for other errors
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#01033E' }} className="lg:flex lg:h-[100vh] h-[110vh] p-10 flex items-center justify-center">
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          border: '2px solid white',
          boxShadow: '0 0 15px 3px white',
        }}
        className="p-10 rounded-lg shadow-lg max-w-md w-full"
      >
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white">Finance Monitor</h1>
          <p className="text-gray-200  mt-2">Track Manage Efficiency</p>
        </div>
       
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={user.email}
            required
            className="p-2 w-full placeholder-gray-500 bg-transparent text-white mt-5 lg:p-3 lg:w-full lg:px-4 lg:py-2 border-gray-300 border rounded mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={user.password}
            required
            className="p-2 w-full text-white lg:w-full lg:p-3 border-gray-300 border rounded mb-10 
            focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
          />
          <button
            type="submit"
            onClick={handleLogin}
             className="p-2 mb-2 lg:mb-7 lg:h-15 lg:p-3 w-full bg-[#01033E] text-white rounded lg:text-2xl 
             font-bold transition transform hover:scale-105 
             hover:bg-[#01033E] hover:border-2 hover:border-solid hover:border-white"
          >
            Continue with email
          </button>
        </form>
        <h4 className="text-xl font-bold text-white text-center">
          Don't have an account? <a className="hover:underline" href="#">Sign Up</a>
        </h4>
      </div>
    </div>
  );
};

export default Login;
