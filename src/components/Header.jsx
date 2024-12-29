// src/components/Header.jsx

import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
	<header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
	  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div className="flex items-center justify-between h-16">
		  {/* Logo or Brand Name */}
		  <div className="flex-shrink-0">
			<Link to="/" className="text-2xl font-bold text-gray-800">
			  Text Tarot
			</Link>
		  </div>
		  
		  {/* Navigation Links (Optional) */}
		  <nav className="hidden md:flex space-x-4">
			<Link to="/" className="text-gray-700 hover:text-gray-900">
			  Home
			</Link>
			<Link to="/terms-of-service" className="text-gray-700 hover:text-gray-900">
			  Terms of Service
			</Link>
			<Link to="/privacy-policy" className="text-gray-700 hover:text-gray-900">
			  Privacy Policy
			</Link>
		  </nav>
		  
		  {/* Mobile Menu Button (Optional) */}
		  {/* You can implement a mobile menu toggle here if needed */}
		</div>
	  </div>
	</header>
  );
};

export default Header;
