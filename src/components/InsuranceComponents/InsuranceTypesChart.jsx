import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Mock data for insurance types
const insuranceTypesData = [
  { type: 'Medicare', claims: 450, amount: 225000, percentage: 35.2, color: '#3b82f6' },
  { type: 'Medicaid', claims: 320, amount: 160000, percentage: 25.0, color: '#10b981' },
  { type: 'Private Insurance', claims: 380, amount: 285000, percentage: 29.7, color: '#f59e0b' },
  { type: 'Workers Comp', claims: 85, amount: 42500, percentage: 6.6, color: '#ef4444' },
  { type: 'Self-Pay', claims: 45, amount: 22500, percentage: 3.5, color: '#8b5cf6' },
];

const InsuranceTypesChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 slide-up" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Insurance Types Distribution</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800">View Details</button>
      </div>
      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={insuranceTypesData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="claims"
              label={({ type, percentage }) => `${type}: ${percentage}%`}
            >
              {insuranceTypesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InsuranceTypesChart;
