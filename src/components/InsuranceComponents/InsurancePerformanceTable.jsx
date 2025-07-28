import React from 'react';

// Mock data for insurance types performance
const insuranceTypesData = [
  { type: 'Medicare', claims: 450, amount: 225000, percentage: 35.2, color: '#3b82f6' },
  { type: 'Medicaid', claims: 320, amount: 160000, percentage: 25.0, color: '#10b981' },
  { type: 'Private Insurance', claims: 380, amount: 285000, percentage: 29.7, color: '#f59e0b' },
  { type: 'Workers Comp', claims: 85, amount: 42500, percentage: 6.6, color: '#ef4444' },
  { type: 'Self-Pay', claims: 45, amount: 22500, percentage: 3.5, color: '#8b5cf6' },
];

const InsurancePerformanceTable = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 slide-up" style={{ animationDelay: '800ms' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Insurance Performance Summary</h3>
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
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Insurance Type</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Claims</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Amount</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Avg. Claim Value</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Market Share</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody>
            {insuranceTypesData.map((insurance, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-3" 
                      style={{ backgroundColor: insurance.color }}
                    ></div>
                    <span className="font-medium text-gray-900">{insurance.type}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{insurance.claims}</td>
                <td className="py-3 px-4 text-gray-600">${insurance.amount.toLocaleString()}</td>
                <td className="py-3 px-4 text-gray-600">${Math.round(insurance.amount / insurance.claims)}</td>
                <td className="py-3 px-4 text-gray-600">{insurance.percentage}%</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Active
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

export default InsurancePerformanceTable;