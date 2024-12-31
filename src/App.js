// src/App.js

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

// Pages
import Home from "./pages/Home";
import TermsOfService from "./pages/legal/TermsOfService";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import SmsService from "./pages/SmsService";

// Components
import Footer from "./components/Footer";
import Header from "./components/Header";

// 1) Initialize GA once at the top level
ReactGA.initialize("G-HXTZ7Q278N");

/**
 * 2) Create a small component that sends page views whenever the route changes.
 */
function RouteChangeTracker() {
  const location = useLocation();

  useEffect(() => {
    // Send a pageview event to Google Analytics whenever location changes
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      {/* This must be inside the Router so it can access location changes */}
      <RouteChangeTracker />

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sms-service" element={<SmsService />} />
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
