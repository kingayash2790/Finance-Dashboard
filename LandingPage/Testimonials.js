// import React from 'react';

// const Testimonials = () => {
//   return (
//     <div className="bg-gray-200 p-10 text-center">
//       <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
//       <div className="grid md:grid-cols-3 gap-4">
//         <div className="bg-white p-6 rounded shadow">
//           <p>"This dashboard has transformed the way I manage my finances!"</p>
//           <p className="mt-2 font-bold">- John Doe</p>
//         </div>
//         <div className="bg-white p-6 rounded shadow">
//           <p>"I love the insights and ease of use. Highly recommend!"</p>
//           <p className="mt-2 font-bold">- Jane Smith</p>
//         </div>
//         <div className="bg-white p-6 rounded shadow">
//           <p>"A game-changer for personal finance management."</p>
//           <p className="mt-2 font-bold">- Bob Johnson</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Testimonials;

import React, { useState, useEffect } from "react";
import "./Testimonial.css"; // Ensure you have this CSS file for additional styling

const testimonials = [
  {
    name: "John Doe",
    text: "This is an amazing product! Highly recommend it.",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "Jane Smith",
    text: "Great service and support. Would use again.",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "Sam Wilson",
    text: "A must-have tool for any professional.",
    image: "https://via.placeholder.com/150"
  }
  // Add more testimonials as needed
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-6 overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 p-4"
          >
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-4 mx-auto"
              />
              <p className="text-gray-700 text-sm">{testimonial.text}</p>
              <p className="mt-4 text-gray-500 text-xs">{testimonial.name}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
      >
        Prev
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
      >
        Next
      </button>
    </div>
  );
}
