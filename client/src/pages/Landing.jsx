import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Import your images
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";

const images = [img1, img2, img3];

const Landing = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative transition-all duration-1000"
      style={{ backgroundImage: `url(${images[current]})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to M-Hotel</h1>
        <p className="text-xl md:text-2xl mb-8">Luxury, Comfort, and Convenience Await</p>
        <div className="space-x-4">
          <Link to="/login" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded text-lg">
            Login
          </Link>
          <Link to="/register" className="px-6 py-3 bg-white text-black hover:bg-gray-200 rounded text-lg">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
