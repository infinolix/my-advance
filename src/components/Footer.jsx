
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text advance-gradient">MyAdvance</h2>
            <p className="mt-2 text-sm text-gray-500">
              Access your earned salary anytime you need it.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/" className="text-base text-gray-500 hover:text-advance-purple">Home</Link></li>
              <li><Link to="/dashboard" className="text-base text-gray-500 hover:text-advance-purple">Dashboard</Link></li>
              <li><Link to="/login" className="text-base text-gray-500 hover:text-advance-purple">Login</Link></li>
              <li><Link to="/signup" className="text-base text-gray-500 hover:text-advance-purple">Sign Up</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-500 hover:text-advance-purple">About</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-advance-purple">Careers</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-advance-purple">Contact</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-500 hover:text-advance-purple">Privacy Policy</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-advance-purple">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-base text-gray-500">
            &copy; {new Date().getFullYear()} MyAdvance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
