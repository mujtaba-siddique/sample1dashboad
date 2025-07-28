import React from 'react';
import { Download, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for unremitted trends
const unremittedTrendsData = [
  { month: 'Jan', amount: 45000, claims: 125, avgDays: 28 },
  { month: 'Feb', amount: 52000, claims: 142, avgDays: 32 },
  { month: 'Mar', amount: 48000, claims: 135, avgDays: 29 },
  { month: 'Apr', amount: 38000, claims: 108, avgDays: 25 },
  { month: 'May', amount: 42000, claims: 118, avgDays: 27 },
  { month: 'Jun', amount: 35000, claims: 98, avgDays: 24 },
];

const UnremittedTrendsChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Unremitted Trends</h3>
        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
            <Download className="h-3 w-3 mr-1" />
            Export
          </button>
          <button className="flex items-center px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
            <RefreshCw className="h-3 w-3 mr-1" />
            Refresh
          </button>
        </div>
      </div>
      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={unremittedTrendsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis yAxisId="left" stroke="#6b7280" />
            <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
            <Tooltip />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="amount" 
              stroke="#ef4444" 
              strokeWidth={3}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="claims" 
              stroke="#f59e0b" 
              strokeWidth={3}
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UnremittedTrendsChart;