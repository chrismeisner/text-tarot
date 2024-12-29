import React from "react";

const PrivacyPolicy = () => {
  return (
	<div style={{ padding: "1rem" }}>
	  <h1>Privacy Policy</h1>
	  <p><strong>Effective Date: December 29, 2024</strong></p>

	  <h2>Introduction</h2>
	  <p>
		At Text Tarot, we respect your privacy and are committed to protecting your personal information.
		This Privacy Policy explains how we collect, use, and safeguard your data when you use our 
		SMS-based Tarot reading service.
	  </p>

	  <h2>1. Information We Collect</h2>
	  <p>
		When you use Text Tarot, we may collect the following information:
		<ul>
		  <li>Phone Number: Collected when you opt-in by texting "TAROT" to our toll-free number.</li>
		  <li>Message Content: Including your text inputs (e.g., "Draw my card") to provide the service.</li>
		  <li>Payment Information: If you make a purchase, payment details are securely processed by our payment partner, Stripe.</li>
		</ul>
	  </p>

	  <h2>2. How We Use Your Information</h2>
	  <p>
		We use the information collected to:
		<ul>
		  <li>Provide the SMS Tarot reading service.</li>
		  <li>Process payments for paid readings and subscriptions.</li>
		  <li>Communicate with you about your account or service updates.</li>
		  <li>Comply with legal and regulatory requirements.</li>
		</ul>
	  </p>

	  <h2>3. Sharing Your Information</h2>
	  <p>
		We do not sell, rent, or share your personal information with third parties, except:
		<ul>
		  <li>With service providers, such as Stripe and Twilio, to process payments and deliver SMS messages.</li>
		  <li>As required by law or to protect our legal rights.</li>
		</ul>
	  </p>

	  <h2>4. Data Security</h2>
	  <p>
		We take reasonable measures to protect your information from unauthorized access, use, or disclosure.
		However, no method of transmission over the internet or electronic storage is 100% secure.
	  </p>

	  <h2>5. Your Rights</h2>
	  <p>
		You have the right to:
		<ul>
		  <li>Opt-out of receiving SMS messages by replying "STOP".</li>
		  <li>Request deletion of your personal information by contacting us at support@text-tarot.com.</li>
		  <li>Access or update your information by reaching out to our support team.</li>
		</ul>
	  </p>

	  <h2>6. Changes to This Policy</h2>
	  <p>
		We may update this Privacy Policy from time to time. Any changes will be effective immediately upon posting.
		Please review this page periodically to stay informed about how we protect your information.
	  </p>

	  <h2>7. Contact Us</h2>
	  <p>
		If you have any questions about this Privacy Policy, please contact us at:
		<br />
		<strong>Email:</strong> support@text-tarot.com
	  </p>

	  <p>© 2024 Text Tarot. All rights reserved.</p>
	</div>
  );
};

export default PrivacyPolicy;
