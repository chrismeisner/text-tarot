// src/components/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
	<footer className="fixed bottom-0 left-0 right-0 text-center p-4 bg-gray-100 shadow-inner">
	  <p className="text-sm text-gray-600">© 2024 Text Tarot. All rights reserved.</p>
	  <div className="mt-2">
		<Link to="/terms-of-service" className="text-blue-500 hover:underline mx-2">
		  Terms of Service
		</Link>
		<span className="text-gray-500">|</span>
		<Link to="/privacy-policy" className="text-blue-500 hover:underline mx-2">
		  Privacy Policy
		</Link>
	  </div>
	</footer>
  );
};

export default Footer;
