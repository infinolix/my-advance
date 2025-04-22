
import React from "react";

const Footer = () => (
  <footer className="w-full px-6 py-6 bg-gray-50 border-t mt-10">
    <div className="max-w-4xl mx-auto text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} MyApp. All rights reserved.
    </div>
  </footer>
);

export default Footer;
