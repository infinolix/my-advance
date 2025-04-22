
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="w-full px-6 py-4 bg-gray-50 border-b">
    <div className="max-w-4xl mx-auto flex items-center justify-between">
      <Link to="/" className="font-bold text-lg text-purple-600">
        MyApp
      </Link>
      <div>
        <Link to="/" className="text-gray-700 hover:text-purple-600 mr-6">
          Home
        </Link>
        <Link to="/about" className="text-gray-700 hover:text-purple-600">
          About
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
