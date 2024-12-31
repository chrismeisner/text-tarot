import React, { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
	document.title = "Privacy Policy - Text Tarot";
	document
	  .querySelector('meta[name="description"]')
	  ?.setAttribute(
		"content",
		"Understand how Text Tarot collects, uses, and protects your personal information in our Privacy Policy."
	  );
  }, []);

  return (
	<div className="prose lg:prose-xl mx-auto p-4 md:p-8">
	  <h1>Privacy Policy</h1>
	  <p className="font-semibold">Effective Date: December 29, 2024</p>

	  <h2>Introduction</h2>
	  <p>
		At Text Tarot, we respect your privacy and are committed to protecting
		your personal information. This Privacy Policy explains how we collect,
		use, and safeguard your data when you use our SMS-based Tarot reading
		service.
	  </p>

	  <h2>1. Information We Collect</h2>
	  <p>When you use Text Tarot, we may collect the following information:</p>
	  <ul>
		<li>
		  <strong>Phone Number:</strong> Collected when you opt in by texting
		  "TAROT" to our toll-free number.
		</li>
		<li>
		  <strong>Message Content:</strong> Including your text inputs (e.g.,
		  "Draw my card") to provide the service.
		</li>
	  </ul>

	  <h2>2. How We Use Your Information</h2>
	  <p>We use the information collected to:</p>
	  <ul>
		<li>Provide our free, one-reading-per-day SMS Tarot service.</li>
		<li>Communicate with you about your account or service updates.</li>
		<li>Comply with legal and regulatory requirements.</li>
	  </ul>

	  <h2>3. Sharing Your Information</h2>
	  <p>We do not sell, rent, or share your personal information with third parties, except:</p>
	  <ul>
		<li>
		  With service providers—such as Twilio—to deliver SMS messages or any
		  other vendors necessary to operate our service.
		</li>
		<li>As required by law or to protect our legal rights.</li>
	  </ul>

	  <h2>4. Data Security</h2>
	  <p>
		We take reasonable measures to protect your information from
		unauthorized access, use, or disclosure. However, no method of
		transmission over the internet or electronic storage is 100% secure.
	  </p>

	  <h2>5. Your Rights</h2>
	  <p>You have the right to:</p>
	  <ul>
		<li>Opt out of receiving SMS messages by replying "STOP".</li>
		<li>
		  Request deletion of your personal information by contacting us at{" "}
		  <a
			href="mailto:support@text-tarot.com"
			className="text-blue-500 hover:underline"
		  >
			support@text-tarot.com
		  </a>
		  .
		</li>
		<li>
		  Access or update your information by reaching out to our support team.
		</li>
	  </ul>

	  <h2>6. Changes to This Policy</h2>
	  <p>
		We may update this Privacy Policy from time to time. Any changes will be
		effective immediately upon posting. Please review this page periodically
		to stay informed about how we protect your information.
	  </p>

	  <h2>7. Contact Us</h2>
	  <p>
		If you have any questions about this Privacy Policy, please contact us
		at:
		<br />
		<strong>Email:</strong>{" "}
		<a
		  href="mailto:support@text-tarot.com"
		  className="text-blue-500 hover:underline"
		>
		  support@text-tarot.com
		</a>
	  </p>
	</div>
  );
};

export default PrivacyPolicy;
