import React, { useEffect } from "react";

const TermsOfService = () => {
  useEffect(() => {
	document.title = "Terms of Service - Text Tarot";
	document
	  .querySelector('meta[name="description"]')
	  ?.setAttribute(
		"content",
		"Read the Terms of Service for Text Tarot, your AI-powered SMS-based Tarot reading service."
	  );
  }, []);

  return (
	<div className="prose lg:prose-xl mx-auto p-4 md:p-8">
	  <h1>Terms of Service</h1>
	  <p className="font-semibold">Effective Date: December 29, 2024</p>

	  <p>
		Welcome to Text Tarot. These Terms of Service ("Terms") govern your use
		of the Text Tarot service ("Service"), provided by Text Tarot,
		accessible via SMS using the phone number (855) 598-2768. By using the
		Service, you agree to these Terms.
	  </p>

	  <h2>1. Service Description</h2>
	  <p>
		Text Tarot provides personalized Tarot readings via SMS. Users can opt
		in to the Service by texting "TAROT" to our toll-free number. The
		Service is free to use, limited to one reading per day.
	  </p>

	  <h2>2. User Consent and Opt-In</h2>
	  <p>
		By texting "TAROT" to our toll-free number, you provide your explicit
		consent to receive SMS messages from Text Tarot. You may opt out at any
		time by replying "STOP." For more information on how your data is
		handled, please review our{" "}
		<a
		  href="/privacy-policy"
		  className="text-blue-500 hover:underline"
		>
		  Privacy Policy
		</a>
		.
	  </p>

	  <h2>3. User Responsibilities</h2>
	  <p>
		By using Text Tarot, you agree to:
	  </p>
	  <ul>
		<li>
		  Provide accurate and valid information when subscribing to or using
		  the Service.
		</li>
		<li>Not misuse or abuse the Service, including spamming or harassing others.</li>
		<li>
		  Understand that Tarot readings are for entertainment purposes only and
		  do not constitute professional advice.
		</li>
	  </ul>

	  <h2>4. Termination</h2>
	  <p>
		We reserve the right to suspend or terminate your access to the Service
		at our sole discretion, without notice, for any violation of these Terms
		or misuse of the Service.
	  </p>

	  <h2>5. Disclaimer of Warranties</h2>
	  <p>
		The Service is provided "as is" and "as available" without any
		warranties, express or implied. Text Tarot makes no guarantees regarding
		the accuracy or reliability of Tarot readings or their applicability to
		your personal circumstances.
	  </p>

	  <h2>6. Limitation of Liability</h2>
	  <p>
		To the fullest extent permitted by law, Text Tarot shall not be liable
		for any damages, including but not limited to indirect, incidental, or
		consequential damages arising from your use of the Service.
	  </p>

	  <h2>7. Changes to These Terms</h2>
	  <p>
		We reserve the right to update these Terms at any time. Any changes will
		be effective immediately upon posting. It is your responsibility to
		review these Terms periodically.
	  </p>

	  <h2>8. Contact Information</h2>
	  <p>
		If you have any questions or concerns about these Terms, please contact
		us at:
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

export default TermsOfService;
