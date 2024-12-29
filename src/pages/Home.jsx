// src/pages/Home.jsx

import React from "react";
import { Helmet } from "react-helmet";
import Countdown from "react-countdown";

// Define the target launch date: February 10, 2025, at 10 AM PST
const launchDate = new Date("2025-02-10T18:00:00Z"); // 10 AM PST is 18:00 UTC

// Renderer callback for react-countdown
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
	// Render a completion state
	return (
	  <span className="text-lg md:text-2xl font-semibold">We're live!</span>
	);
  } else {
	// Render the countdown
	return (
	  <div className="flex justify-center space-x-4 text-center">
		<div className="p-2 bg-gray-800 bg-opacity-50 rounded-md dark:bg-gray-600 dark:bg-opacity-50">
		  <span className="block text-2xl md:text-4xl font-bold">{days}</span>
		  <span className="text-sm md:text-base">Days</span>
		</div>
		<div className="p-2 bg-gray-800 bg-opacity-50 rounded-md dark:bg-gray-600 dark:bg-opacity-50">
		  <span className="block text-2xl md:text-4xl font-bold">{hours}</span>
		  <span className="text-sm md:text-base">Hours</span>
		</div>
		<div className="p-2 bg-gray-800 bg-opacity-50 rounded-md dark:bg-gray-600 dark:bg-opacity-50">
		  <span className="block text-2xl md:text-4xl font-bold">{minutes}</span>
		  <span className="text-sm md:text-base">Minutes</span>
		</div>
		<div className="p-2 bg-gray-800 bg-opacity-50 rounded-md dark:bg-gray-600 dark:bg-opacity-50">
		  <span className="block text-2xl md:text-4xl font-bold">{seconds}</span>
		  <span className="text-sm md:text-base">Seconds</span>
		</div>
	  </div>
	);
  }
};

const Home = () => {
  return (
	<>
	  {/* Helmet for SEO and Page Metadata */}
	  <Helmet>
		<title>Text Tarot - Coming Soon</title>
		<meta
		  name="description"
		  content="Text Tarot is launching soon! Get ready for personalized AI-powered Tarot readings via SMS."
		/>
	  </Helmet>

	  {/* Full-Screen Centered Container Without Padding */}
	  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
		{/* Overlay Container */}
		<div className="text-center text-white p-6 bg-black bg-opacity-50 rounded-lg shadow-lg w-full max-w-3xl dark:bg-gray-700 dark:bg-opacity-75">
		  <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Coming Soon</h1>
		  <p className="text-lg md:text-2xl mb-6">
			We're working hard to bring you personalized Tarot readings via SMS.
		  </p>
		  
		  {/* Countdown Timer */}
		  <Countdown date={launchDate} renderer={renderer} />

		  <p className="text-md md:text-lg mt-6">
			Stay tuned for the launch!
		  </p>
		</div>
	  </div>
	</>
  );
};

export default Home;
