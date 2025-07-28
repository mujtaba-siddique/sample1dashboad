import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for aging buckets
const agingBucketsData = [
  { range: '0-30 days', amount: 85000, claims: 245, percentage: 35.2, color: '#10b981' },
  { range: '31-60 days', amount: 65000, claims: 185, percentage: 26.9, color: '#f59e0b' },
  { range: '61-90 days', amount: 48000, claims: 138, percentage: 19.9, color: '#ef4444' },
  { range: '91-120 days', amount: 28000, claims: 82, percentage: 11.6, color: '#8b5cf6' },
  { range: '120+ days', amount: 15000, claims: 45, percentage: 6.2, color: '#6b7280' },
];

const AgingBucketsChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 slide-up" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Aging Analysis</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800">View Details</button>
      </div>
      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={agingBucketsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="range" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Bar dataKey="amount" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AgingBucketsChart;
