import React from "react";

const Home = () => {
  return (
	<main style={{ padding: "1rem" }}>
	  <h1>Welcome to Text Tarot</h1>
	  <p>
		Text Tarot is a simple and accessible SMS-based service that delivers 
		personalized Tarot readings powered by AI.
	  </p>
	  <ul>
		<li>One free Tarot reading upon sign-up.</li>
		<li>Pay-as-you-go readings for $1 per reading.</li>
		<li>A $4.20/month subscription plan for daily readings.</li>
	  </ul>
	  <p>
		Start your journey by texting <strong>"TAROT"</strong> to <strong>(855) 598-2768</strong>.
	  </p>
	</main>
  );
};

export default Home;
