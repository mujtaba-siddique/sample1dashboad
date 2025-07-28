import React from 'react';

// Mock data for recent claims
const recentClaims = [
  { id: 'CLM-2024-001', patient: 'John Smith', insurance: 'Medicare', amount: '$1,250', status: 'Approved', date: '2024-01-15' },
  { id: 'CLM-2024-002', patient: 'Sarah Johnson', insurance: 'Aetna', amount: '$850', status: 'Pending', date: '2024-01-14' },
  { id: 'CLM-2024-003', patient: 'Michael Brown', insurance: 'Blue Cross', amount: '$2,100', status: 'Approved', date: '2024-01-14' },
  { id: 'CLM-2024-004', patient: 'Emily Davis', insurance: 'Medicaid', amount: '$675', status: 'Under Review', date: '2024-01-13' },
  { id: 'CLM-2024-005', patient: 'Robert Wilson', insurance: 'Cigna', amount: '$1,450', status: 'Denied', date: '2024-01-13' },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Approved': return 'bg-green-100 text-green-800';
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    case 'Under Review': return 'bg-blue-100 text-blue-800';
    case 'Denied': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const RecentClaimsTable = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 slide-up" style={{ animationDelay: '600ms' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Recent Claims</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
      </div>
      <div className="space-y-3">
        {recentClaims.map((claim, index) => (
          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <p className="font-medium text-gray-900">{claim.id}</p>
              <p className="text-sm text-gray-600">{claim.patient} • {claim.insurance}</p>
              <p className="text-xs text-gray-500">{claim.date}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">{claim.amount}</p>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(claim.status)}`}>
                {claim.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentClaimsTable;
