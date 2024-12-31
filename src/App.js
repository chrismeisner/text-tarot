// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import TermsOfService from "./pages/legal/TermsOfService";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import SmsService from "./pages/SmsService"; // <-- Import the new page

// Components
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        <Header />
        
        <main className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sms-service" element={<SmsService />} /> {/* NEW ROUTE */}
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
