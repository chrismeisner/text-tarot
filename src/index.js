// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated for React 18
import './index.css'; // Global CSS
import App from './App';

// Create a root for React 18
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
