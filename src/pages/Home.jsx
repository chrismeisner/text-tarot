import React, { useState } from "react";

const Home = () => {
  const phoneNumber = "(855) 517-4207";

  // Simple copy function
  const handleCopy = (text) => {
	navigator.clipboard.writeText(text);
	alert(`Copied "${text}" to the clipboard!`);
  };

  return (
	<div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
	  <div className="max-w-md w-full text-black">
		<h1 className="text-2xl font-bold mb-6">Text TAROT</h1>
		<ol className="list-decimal ml-4 mb-8 space-y-2">
		  <li>Copy the phone number below and text “TAROT” to sign up.</li>
		  <li>Once you’ve signed up, text “DRAW” for a general reading.</li>
		  <li>Include extra context by typing something like “Draw about my new job.”</li>
		</ol>

		{/* Phone Number Field */}
		<div className="mb-6">
		  <label className="block mb-1 font-semibold">Phone Number:</label>
		  <div className="flex">
			<input
			  type="text"
			  readOnly
			  value={phoneNumber}
			  className="border border-black p-2 w-full"
			/>
			<button
			  onClick={() => handleCopy(phoneNumber)}
			  className="border border-black p-2 ml-2"
			>
			  Copy
			</button>
		  </div>
		</div>

		{/* TAROT Field */}
		<div className="mb-6">
		  <label className="block mb-1 font-semibold">Keyword:</label>
		  <div className="flex">
			<input
			  type="text"
			  readOnly
			  value="TAROT"
			  className="border border-black p-2 w-full"
			/>
			<button
			  onClick={() => handleCopy("TAROT")}
			  className="border border-black p-2 ml-2"
			>
			  Copy
			</button>
		  </div>
		</div>

		{/* DRAW Field */}
		<div>
		  <label className="block mb-1 font-semibold">Keyword:</label>
		  <div className="flex">
			<input
			  type="text"
			  readOnly
			  value="DRAW"
			  className="border border-black p-2 w-full"
			/>
			<button
			  onClick={() => handleCopy("DRAW")}
			  className="border border-black p-2 ml-2"
			>
			  Copy
			</button>
		  </div>
		</div>
	  </div>
	</div>
  );
};

export default Home;
