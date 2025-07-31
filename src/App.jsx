import React, { useState } from "react";
import { Calendar, Store } from "lucide-react";
import PredictionForm from "./components/PredictionForm.jsx";
import ResultDisplay from "./components/ResultDisplay.jsx";
import HistoryChart from "./components/HistoryChart.jsx";
import { Icon } from "./components/shared/Icon.jsx";

/**
 * Main App Component
 * This is the root of the application. It orchestrates all other components
 * and manages the overall state.
 */
export default function App() {
  // --- State Management ---
  const [prediction, setPrediction] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {/* --- Header --- */}
      <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg p-4 sticky top-0 z-10 border-b border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-white flex items-center">
            <Icon icon={Store} className="mr-3 text-blue-400" />
            SalesVision AI Dashboard
          </h1>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Icon icon={Calendar} className="h-5 w-5" />
            <span>
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form */}
          <div className="lg:col-span-2">
            <PredictionForm
              setPrediction={setPrediction}
              setHistory={setHistory}
              setLoading={setLoading}
              setError={setError}
            />
          </div>

          {/* Right Column: Result Display */}
          <div className="lg:col-span-1">
            <ResultDisplay
              prediction={prediction}
              loading={loading}
              error={error}
            />
          </div>
        </div>

        {/* Full-width Row: History Chart */}
        <div className="mt-8">
          <HistoryChart history={history} />
        </div>
      </main>
    </div>
  );
}
