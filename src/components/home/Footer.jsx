
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text advance-gradient">MyAdvance</h2>
          </div>
          <div className="mt-8 md:mt-0">
            <p className="text-center md:text-right text-base text-gray-500">
              &copy; 2025 MyAdvance. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
