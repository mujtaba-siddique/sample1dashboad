import React from 'react';
import { AlertTriangle } from 'lucide-react';

// Mock data for payer-wise analysis
const payerWiseData = [
  { payer: 'Medicare', amount: 125000, claims: 285, avgDays: 32, status: 'High Priority' },
  { payer: 'Aetna', amount: 98000, claims: 225, avgDays: 28, status: 'Medium' },
  { payer: 'Blue Cross', amount: 87000, claims: 198, avgDays: 35, status: 'High Priority' },
  { payer: 'Cigna', amount: 65000, claims: 152, avgDays: 25, status: 'Low' },
  { payer: 'Medicaid', amount: 45000, claims: 135, avgDays: 42, status: 'Critical' },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Critical': return 'bg-red-100 text-red-800';
    case 'High Priority': return 'bg-orange-100 text-orange-800';
    case 'Medium': return 'bg-yellow-100 text-yellow-800';
    case 'Low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const PayerAnalysisChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 slide-up" style={{ animationDelay: '400ms' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Payer-wise Analysis</h3>
        <button className="flex items-center px-3 py-1 text-xs bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Action Required
        </button>
      </div>
      <div className="space-y-4">
        {payerWiseData.map((payer, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-gray-900">{payer.payer}</p>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payer.status)}`}>
                  {payer.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium">${payer.amount.toLocaleString()}</p>
                  <p className="text-xs">Amount</p>
                </div>
                <div>
                  <p className="font-medium">{payer.claims}</p>
                  <p className="text-xs">Claims</p>
                </div>
                <div>
                  <p className="font-medium">{payer.avgDays} days</p>
                  <p className="text-xs">Avg. Days</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayerAnalysisChart;
