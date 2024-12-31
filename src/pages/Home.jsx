import React from "react";

const Home = () => {
  return (
	<>
	  {/* Full-Screen Centered Container */}
	  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
		{/* Overlay Container */}
		<div className="text-center text-white p-6 bg-black bg-opacity-50 rounded-lg shadow-lg w-full max-w-3xl dark:bg-gray-700 dark:bg-opacity-75">
		  <h1 className="text-4xl md:text-6xl font-extrabold mb-4">We're Live!</h1>
		  <p className="text-lg md:text-2xl mb-6">
			Our personalized Tarot readings via SMS are up and running. 
			Text <span className="font-semibold">TAROT</span> to 
			<span className="font-semibold"> (855) 517-4207</span> 
			to receive your first reading. 
		  </p>
		  <p className="text-md md:text-lg mt-6">
			Thanks for stopping by — we can’t wait to guide you on your spiritual journey!
		  </p>
		</div>
	  </div>
	</>
  );
};

export default Home;
