import React, { useState, useEffect } from 'react';
import { Shield, DollarSign, FileText, TrendingUp, AlertTriangle, Users, Calendar, Activity, Download, Filter, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';

// Insurance data
const insuranceClaimsData = [
  { month: 'Jan', submitted: 245, approved: 220, denied: 15, pending: 10, revenue: 125000 },
  { month: 'Feb', submitted: 268, approved: 240, denied: 18, pending: 10, revenue: 138000 },
  { month: 'Mar', submitted: 290, approved: 265, denied: 15, pending: 10, revenue: 152000 },
  { month: 'Apr', submitted: 315, approved: 285, denied: 20, pending: 10, revenue: 168000 },
  { month: 'May', submitted: 342, approved: 310, denied: 22, pending: 10, revenue: 185000 },
  { month: 'Jun', submitted: 365, approved: 335, denied: 18, pending: 12, revenue: 198000 },
];

const insuranceTypesData = [
  { type: 'Medicare', claims: 450, amount: 225000, percentage: 35.2, color: '#3b82f6' },
  { type: 'Medicaid', claims: 320, amount: 160000, percentage: 25.0, color: '#10b981' },
  { type: 'Private Insurance', claims: 380, amount: 285000, percentage: 29.7, color: '#f59e0b' },
  { type: 'Workers Comp', claims: 85, amount: 42500, percentage: 6.6, color: '#ef4444' },
  { type: 'Self-Pay', claims: 45, amount: 22500, percentage: 3.5, color: '#8b5cf6' },
];

const denialReasonsData = [
  { reason: 'Prior Authorization', count: 45, percentage: 28.1 },
  { reason: 'Coding Error', count: 38, percentage: 23.8 },
  { reason: 'Missing Documentation', count: 32, percentage: 20.0 },
  { reason: 'Eligibility Issues', count: 25, percentage: 15.6 },
  { reason: 'Duplicate Claims', count: 20, percentage: 12.5 },
];

const insuranceMetrics = [
  { title: 'Total Claims', value: '2,025', change: '+8.5%', icon: FileText, color: 'from-blue-500 to-indigo-600' },
  { title: 'Approval Rate', value: '91.2%', change: '+2.1%', icon: Shield, color: 'from-green-500 to-emerald-600' },
  { title: 'Total Revenue', value: '$1.2M', change: '+12.3%', icon: DollarSign, color: 'from-purple-500 to-violet-600' },
  { title: 'Avg Processing Time', value: '4.2 days', change: '-0.8 days', icon: Calendar, color: 'from-orange-500 to-red-500' },
];

const recentClaims = [
  { id: 'CLM-2024-001', patient: 'John Smith', insurance: 'Medicare', amount: '$1,250', status: 'Approved', date: '2024-01-15' },
  { id: 'CLM-2024-002', patient: 'Sarah Johnson', insurance: 'Aetna', amount: '$850', status: 'Pending', date: '2024-01-14' },
  { id: 'CLM-2024-003', patient: 'Michael Brown', insurance: 'Blue Cross', amount: '$2,100', status: 'Approved', date: '2024-01-14' },
  { id: 'CLM-2024-004', patient: 'Emily Davis', insurance: 'Medicaid', amount: '$675', status: 'Under Review', date: '2024-01-13' },
  { id: 'CLM-2024-005', patient: 'Robert Wilson', insurance: 'Cigna', amount: '$1,450', status: 'Denied', date: '2024-01-13' },
];

const MetricCard = ({ icon: Icon, value, title, change, color, delay = 0 }) => (
  <div className={`bg-white rounded-xl shadow-lg p-6 fade-in`} style={{ animationDelay: `${delay}ms` }}>
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className={`text-sm font-medium ${change.includes('+') ? 'text-green-600' : change.includes('-') ? 'text-red-600' : 'text-gray-600'}`}>
          {change}
        </p>
      </div>
    </div>
    <div className="mt-4">
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  </div>
);

const getStatusColor = (status) => {
  switch (status) {
    case 'Approved': return 'bg-green-100 text-green-800';
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    case 'Under Review': return 'bg-blue-100 text-blue-800';
    case 'Denied': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const InsurancePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8 fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Insurance Management</h1>
        <p className="text-gray-600">Monitor insurance claims, approvals, and revenue performance</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {insuranceMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            icon={metric.icon}
            // value={metric.value}
            title={metric.title}
            change={metric.change}
            color={metric.color}
            delay={index * 100}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Claims Trend Chart */}
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

        {/* Insurance Types Distribution */}
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
      </div>

      {/* Denial Reasons and Recent Claims */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Denial Reasons */}
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

        {/* Recent Claims */}
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
      </div>

      {/* Insurance Performance Table */}
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
    </div>
  );
};

export default InsurancePage;

