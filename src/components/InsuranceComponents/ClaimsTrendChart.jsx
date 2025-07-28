import React from 'react';
import { Download, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for insurance claims
const insuranceClaimsData = [
  { month: 'Jan', submitted: 245, approved: 220, denied: 15, pending: 10, revenue: 125000 },
  { month: 'Feb', submitted: 268, approved: 240, denied: 18, pending: 10, revenue: 138000 },
  { month: 'Mar', submitted: 290, approved: 265, denied: 15, pending: 10, revenue: 152000 },
  { month: 'Apr', submitted: 315, approved: 285, denied: 20, pending: 10, revenue: 168000 },
  { month: 'May', submitted: 342, approved: 310, denied: 22, pending: 10, revenue: 185000 },
  { month: 'Jun', submitted: 365, approved: 335, denied: 18, pending: 12, revenue: 198000 },
];

const ClaimsTrendChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Claims & Revenue Trends</h3>
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
          <AreaChart data={insuranceClaimsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="approved" 
              stackId="1"
              stroke="#10b981" 
              fill="#10b981"
              fillOpacity={0.6}
            />
            <Area 
              type="monotone" 
              dataKey="pending" 
              stackId="1"
              stroke="#f59e0b" 
              fill="#f59e0b"
              fillOpacity={0.6}
            />
            <Area 
              type="monotone" 
              dataKey="denied" 
              stackId="1"
              stroke="#ef4444" 
              fill="#ef4444"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClaimsTrendChart;