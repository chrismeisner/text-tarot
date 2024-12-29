// src/App.js
import React from 'react';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-900 text-white">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Text Tarot</h1>
        <p className="text-xl mt-2">Mystical AI Insights, Straight to Your Phone</p>
      </header>

      <main className="text-center">
        <h2 className="text-2xl font-semibold">Launching Soon</h2>
        <p className="mt-4">
          Get personalized Tarot readings via SMS, powered by AI.
        </p>
        <p className="mt-2 text-sm opacity-75">
          Pay-as-you-go readings or subscribe for daily guidance.
        </p>
        <div className="mt-6">
          <button className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-full text-white">
            Notify Me
          </button>
        </div>
      </main>

      <footer className="absolute bottom-4 text-sm">
        <p>© {new Date().getFullYear()} Text Tarot. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
