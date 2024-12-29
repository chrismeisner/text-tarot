// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import TermsOfService from "./pages/legal/TermsOfService";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";

// Components
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        {/* Persistent Header */}
        <Header />
        
        {/* Main Content */}
        <main className="flex-1 pt-16 pb-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        
        {/* Fixed Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
