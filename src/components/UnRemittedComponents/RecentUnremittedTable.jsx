import React, { useState } from 'react';
import { Search } from 'lucide-react';

// Mock data for recent unremitted claims
const recentUnremitted = [
  { id: 'UR-2024-001', patient: 'Alice Johnson', payer: 'Medicare', amount: '$2,450', days: 45, priority: 'High', date: '2023-12-01' },
  { id: 'UR-2024-002', patient: 'Bob Smith', payer: 'Aetna', amount: '$1,850', days: 32, priority: 'Medium', date: '2023-12-15' },
  { id: 'UR-2024-003', patient: 'Carol Davis', payer: 'Blue Cross', amount: '$3,200', days: 58, priority: 'Critical', date: '2023-11-28' },
  { id: 'UR-2024-004', patient: 'David Wilson', payer: 'Cigna', amount: '$1,650', days: 28, priority: 'Low', date: '2023-12-18' },
  { id: 'UR-2024-005', patient: 'Eva Brown', payer: 'Medicaid', amount: '$2,100', days: 67, priority: 'Critical', date: '2023-11-15' },
  { id: 'UR-2024-006', patient: 'inva Brown', payer: 'Medicaid', amount: '$2,100', days: 67, priority: 'Critical', date: '2023-11-15' },
];

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'Critical': return 'bg-red-100 text-red-800';
    case 'High': return 'bg-orange-100 text-orange-800';
    case 'Medium': return 'bg-yellow-100 text-yellow-800';
    case 'Low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const RecentUnremittedTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUnremitted = recentUnremitted.filter(item =>
    item.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.payer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 slide-up" style={{ animationDelay: '600ms' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Recent Unremitted Claims</h3>
        <div className="relative">
          {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search claims..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-48 bg-gray-100 border-0 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          /> */}
        </div>
      </div>
      <div className="space-y-3  overflow-y-auto">
        {filteredUnremitted.map((claim, index) => (
          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-gray-900">{claim.id}</p>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(claim.priority)}`}>
                  {claim.priority}
                </span>
              </div>
              <p className="text-sm text-gray-600">{claim.patient} • {claim.payer}</p>
              <p className="text-xs text-gray-500">{claim.date} • {claim.days} days outstanding</p>
            </div>
            <div className="text-right ml-4">
              <p className="font-bold text-gray-900">{claim.amount}</p>
              <p className="text-xs text-gray-500">{claim.days} days</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUnremittedTable;
