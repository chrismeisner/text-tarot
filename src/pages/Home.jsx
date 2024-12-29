// src/pages/Home.jsx

import React from "react";

const Home = () => {
  return (
	<main className="p-4 md:p-8 bg-white">
	  {/* Container with Max-Width, Centering, and Prose Styling */}
	  <div className="max-w-3xl mx-auto prose lg:prose-xl">
		<h1 className="text-center text-gray-800">Welcome to Text Tarot</h1>
		<p>
		  Text Tarot is a simple and accessible SMS-based service that delivers 
		  personalized Tarot readings powered by AI.
		</p>
		<ul>
		  <li>One free Tarot reading upon sign-up.</li>
		  <li>Pay-as-you-go readings for <span className="font-semibold">$1</span> per reading.</li>
		  <li>A <span className="font-semibold">$4.20/month</span> subscription plan for daily readings.</li>
		</ul>
		<p className="text-center">
		  Start your journey by texting <strong>"TAROT"</strong> to{" "}
		  <a href="tel:+18555982768" className="text-blue-500 underline">
			<strong>(855) 598-2768</strong>
		  </a>.
		</p>
	  </div>
	</main>
  );
};

export default Home;
