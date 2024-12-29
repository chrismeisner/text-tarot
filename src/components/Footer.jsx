import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
	<footer
	  style={{
		textAlign: "center",
		padding: "1rem",
		backgroundColor: "#f4f4f4",
		marginTop: "2rem"
	  }}
	>
	  <p>© 2024 Text Tarot. All rights reserved.</p>
	  <p>
		<Link to="/terms-of-service">Terms of Service</Link> |{" "}
		<Link to="/privacy-policy">Privacy Policy</Link>
	  </p>
	</footer>
  );
};

export default Footer;
