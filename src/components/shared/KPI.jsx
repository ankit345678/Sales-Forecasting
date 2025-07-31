// src/components/shared/KPI.jsx
import React from "react";
export const KPI = ({ label, value, isLoading }) => (
  <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 transition-transform transform hover:-translate-y-1">
    <p className="text-sm text-gray-400">{label}</p>
    {isLoading ? (
      <div className="h-8 w-24 bg-gray-700 rounded-md animate-pulse mt-1"></div>
    ) : (
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    )}
  </div>
);
