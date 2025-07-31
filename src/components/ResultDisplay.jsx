import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { DollarSign, BarChart2 } from "lucide-react";
import { Icon } from "./shared/Icon";

/**
 * ResultDisplay Component
 * Shows the prediction result using a large number and a gauge chart for visualization.
 */
const ResultDisplay = ({ prediction, loading, error }) => {
  // Determine color based on prediction value
  const getGaugeColor = (value) => {
    if (value === null) return "#6b7280"; // Gray for null
    if (value < 2000) return "#f87171"; // Red
    if (value < 4000) return "#fbbf24"; // Amber
    return "#4ade80"; // Green
  };

  const gaugeData = [{ value: prediction || 0 }];
  const color = getGaugeColor(prediction);

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl h-full border border-gray-700 flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
      
        Prediction Result
      </h2>
      <div className="flex-grow flex items-center justify-center w-full">
        {loading && (
          <div className="text-white text-xl animate-pulse">Calculating...</div>
        )}
        {error && <div className="text-red-400 text-center">{error}</div>}
        {prediction !== null && !loading && (
          <div className="text-center w-full">
            <div style={{ width: "100%", height: 160 }}>
              <ResponsiveContainer>
                <PieChart>
                  {/* <Pie
                    data={gaugeData}
                    dataKey="value"
                    cx="50%"
                    cy="100%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={70}
                    outerRadius={100}
                    fill={color}
                    paddingAngle={2}
                    labelLine={false}
                  >
                    <Cell key={`cell-0`} fill={color} />
                  </Pie> */}
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-5xl font-bold -mt-16" style={{ color }}>
             $ {prediction.toFixed(2)}
            </p>
            <p className="text-gray-400 mt-2">Predicted Item Outlet Sales</p>
          </div>
        )}
        {!loading && !error && prediction === null && (
          <div className="text-gray-500 text-center">
            <Icon icon={BarChart2} className="mx-auto h-16 w-16 mb-4" />
            <p>Your prediction will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;
