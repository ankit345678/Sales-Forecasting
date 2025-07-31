import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { Icon } from "./shared/Icon";

/**
 * HistoryChart Component
 * Shows a line chart of past predictions to visualize trends.
 */
const HistoryChart = ({ history }) => (
  <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl mt-8 border border-gray-700">
    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
      <Icon icon={TrendingUp} className="mr-3 text-purple-400" />
      Prediction History
    </h2>
    {history.length > 1 ? (
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={history}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
            <XAxis dataKey="name" stroke="#a0aec0" />
            <YAxis stroke="#a0aec0" domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#2d3748",
                border: "1px solid #4a5568",
                color: "#e2e8f0",
              }}
              itemStyle={{ color: "#8884d8" }}
              labelStyle={{ color: "#a0aec0" }}
            />
            <Legend wrapperStyle={{ color: "#e2e8f0" }} />
            <Line
              type="monotone"
              dataKey="sales"
              name="Predicted Sales"
              stroke="#8884d8"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    ) : (
      <div className="h-[300px] flex items-center justify-center text-gray-500">
        <p>
          A history chart will be shown after at least two predictions are made.
        </p>
      </div>
    )}
  </div>
);

export default HistoryChart;
