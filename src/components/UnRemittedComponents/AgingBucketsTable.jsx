import React from 'react';

// Mock data for aging buckets
const agingBucketsData = [
  { range: '0-30 days', amount: 85000, claims: 245, percentage: 35.2, color: '#10b981' },
  { range: '31-60 days', amount: 65000, claims: 185, percentage: 26.9, color: '#f59e0b' },
  { range: '61-90 days', amount: 48000, claims: 138, percentage: 19.9, color: '#ef4444' },
  { range: '91-120 days', amount: 28000, claims: 82, percentage: 11.6, color: '#8b5cf6' },
  { range: '120+ days', amount: 15000, claims: 45, percentage: 6.2, color: '#6b7280' },
];

const AgingBucketsTable = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 slide-up" style={{ animationDelay: '800ms' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Aging Buckets Summary</h3>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
            Export Data
          </button>
          <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Filter
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Age Range</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Amount</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Number of Claims</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Percentage</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Avg. Claim Value</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Priority</th>
            </tr>
          </thead>
          <tbody>
            {agingBucketsData.map((bucket, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-3" 
                      style={{ backgroundColor: bucket.color }}
                    ></div>
                    <span className="font-medium text-gray-900">{bucket.range}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">${bucket.amount.toLocaleString()}</td>
                <td className="py-3 px-4 text-gray-600">{bucket.claims}</td>
                <td className="py-3 px-4 text-gray-600">{bucket.percentage}%</td>
                <td className="py-3 px-4 text-gray-600">${Math.round(bucket.amount / bucket.claims)}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    index === 0 ? 'bg-green-100 text-green-800' :
                    index === 1 ? 'bg-yellow-100 text-yellow-800' :
                    index === 2 ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {index === 0 ? 'Low' : index === 1 ? 'Medium' : index === 2 ? 'High' : 'Critical'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgingBucketsTable;