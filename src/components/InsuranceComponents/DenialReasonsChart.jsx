import React from 'react';
import { AlertTriangle } from 'lucide-react';

// Mock data for denial reasons
const denialReasonsData = [
  { reason: 'Prior Authorization', count: 45, percentage: 28.1 },
  { reason: 'Coding Error', count: 38, percentage: 23.8 },
  { reason: 'Missing Documentation', count: 32, percentage: 20.0 },
  { reason: 'Eligibility Issues', count: 25, percentage: 15.6 },
  { reason: 'Duplicate Claims', count: 20, percentage: 12.5 },
];

const DenialReasonsChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 slide-up" style={{ animationDelay: '400ms' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Top Denial Reasons</h3>
        <button className="flex items-center px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Action Required
        </button>
      </div>
      <div className="space-y-4">
        {denialReasonsData.map((reason, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <p className="font-medium text-gray-900">{reason.reason}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: `${reason.percentage}%` }}
                ></div>
              </div>
            </div>
            <div className="ml-4 text-right">
              <p className="text-lg font-bold text-gray-900">{reason.count}</p>
              <p className="text-sm text-gray-600">{reason.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DenialReasonsChart;
