// src/pages/legal/TermsOfService.jsx

import React from "react";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";

const TermsOfService = () => {
  return (
	<>
	  <Helmet>
		<title>Terms of Service - Text Tarot</title>
		<meta
		  name="description"
		  content="Read the Terms of Service for Text Tarot, your AI-powered SMS-based Tarot reading service."
		/>
	  </Helmet>
	  <div className="flex flex-col min-h-screen bg-gray-50">
		<main className="flex-1 p-4 md:p-8">
		  <div className="prose lg:prose-xl mx-auto">
			<h1>Terms of Service</h1>
			<p className="font-semibold">Effective Date: December 29, 2024</p>

			<p>
			  Welcome to Text Tarot. These Terms of Service ("Terms") govern your use of the Text Tarot service ("Service"), 
			  provided by Text Tarot, accessible via SMS using the phone number (855) 598-2768. By using the Service, 
			  you agree to these Terms.
			</p>

			<h2>1. Service Description</h2>
			<p>
			  Text Tarot provides personalized Tarot readings via SMS. Users can opt-in to the Service by texting 
			  "TAROT" to our toll-free number. The Service offers:
			</p>
			<ul>
			  <li>One free Tarot reading upon sign-up.</li>
			  <li>Pay-as-you-go readings for <strong>$1</strong> per reading.</li>
			  <li>A <strong>$4.20/month</strong> subscription plan for daily readings (one reading per 24 hours).</li>
			</ul>

			<h2>2. User Consent and Opt-In</h2>
			<p>
			  By texting "TAROT" to our toll-free number, you provide your explicit consent to receive SMS messages from Text Tarot.
			  You may opt-out at any time by replying "STOP." 
			  For more information on how your data is handled, please review our <a href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</a>.
			</p>

			<h2>3. Fees and Payments</h2>
			<p>
			  The following fees apply to our Service:
			</p>
			<ul>
			  <li>Pay-as-you-go: $1 per additional Tarot reading after your free reading.</li>
			  <li>Subscription: $4.20/month for daily readings (billed monthly).</li>
			</ul>
			<p>
			  Payments are securely processed through our third-party payment processor, Stripe. 
			  By purchasing readings or subscriptions, you agree to Stripe's <a href="https://stripe.com/us/legal" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Terms of Service</a>.
			</p>

			<h2>4. User Responsibilities</h2>
			<p>
			  By using Text Tarot, you agree to:
			</p>
			<ul>
			  <li>Provide accurate and valid information when subscribing to or using the Service.</li>
			  <li>Not misuse or abuse the Service, including spamming or harassing others.</li>
			  <li>Understand that Tarot readings are for entertainment purposes only and do not constitute professional advice.</li>
			</ul>

			<h2>5. Cancellation and Refunds</h2>
			<p>
			  You may cancel your subscription at any time by replying "CANCEL" or managing your account via the provided
			  links in subscription messages. Refunds are not available for completed readings or partial months of subscription.
			</p>

			<h2>6. Termination</h2>
			<p>
			  We reserve the right to suspend or terminate your access to the Service at our sole discretion, without notice, 
			  for any violation of these Terms or misuse of the Service.
			</p>

			<h2>7. Disclaimer of Warranties</h2>
			<p>
			  The Service is provided "as is" and "as available" without any warranties, express or implied. Text Tarot makes no
			  guarantees regarding the accuracy or reliability of Tarot readings or their applicability to your personal circumstances.
			</p>

			<h2>8. Limitation of Liability</h2>
			<p>
			  To the fullest extent permitted by law, Text Tarot shall not be liable for any damages, including but not limited 
			  to indirect, incidental, or consequential damages arising from your use of the Service.
			</p>

			<h2>9. Changes to These Terms</h2>
			<p>
			  We reserve the right to update these Terms at any time. Any changes will be effective immediately upon posting. 
			  It is your responsibility to review these Terms periodically.
			</p>

			<h2>10. Contact Information</h2>
			<p>
			  If you have any questions or concerns about these Terms, please contact us at:
			  <br />
			  <strong>Email:</strong> <a href="mailto:support@text-tarot.com" className="text-blue-500 hover:underline">support@text-tarot.com</a>
			</p>

			<footer className="mt-8 text-sm text-center text-gray-600">
			  © 2024 Text Tarot. All rights reserved.
			</footer>
		  </div>
		</main>
		<Footer />
	  </div>
	</>
  );
};

export default TermsOfService;
