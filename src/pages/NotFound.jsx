
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
    <h1 className="text-6xl font-bold mb-4 text-purple-700">404</h1>
    <p className="mb-6 text-gray-600">Page not found.</p>
    <Link to="/" className="text-purple-700 underline">Go Home</Link>
  </div>
);

export default NotFound;
