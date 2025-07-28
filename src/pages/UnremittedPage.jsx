import React, { useState, useEffect } from 'react';
import { AlertTriangle, DollarSign, Clock, FileText, TrendingDown, Calendar, Activity, Users, Download, Filter, RefreshCw, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

// Unremitted data
const unremittedTrendsData = [
  { month: 'Jan', amount: 45000, claims: 125, avgDays: 28 },
  { month: 'Feb', amount: 52000, claims: 142, avgDays: 32 },
  { month: 'Mar', amount: 48000, claims: 135, avgDays: 29 },
  { month: 'Apr', amount: 38000, claims: 108, avgDays: 25 },
  { month: 'May', amount: 42000, claims: 118, avgDays: 27 },
  { month: 'Jun', amount: 35000, claims: 98, avgDays: 24 },
];

const agingBucketsData = [
  { range: '0-30 days', amount: 85000, claims: 245, percentage: 35.2, color: '#10b981' },
  { range: '31-60 days', amount: 65000, claims: 185, percentage: 26.9, color: '#f59e0b' },
  { range: '61-90 days', amount: 48000, claims: 138, percentage: 19.9, color: '#ef4444' },
  { range: '91-120 days', amount: 28000, claims: 82, percentage: 11.6, color: '#8b5cf6' },
  { range: '120+ days', amount: 15000, claims: 45, percentage: 6.2, color: '#6b7280' },
];

const payerWiseData = [
  { payer: 'Medicare', amount: 125000, claims: 285, avgDays: 32, status: 'High Priority' },
  { payer: 'Aetna', amount: 98000, claims: 225, avgDays: 28, status: 'Medium' },
  { payer: 'Blue Cross', amount: 87000, claims: 198, avgDays: 35, status: 'High Priority' },
  { payer: 'Cigna', amount: 65000, claims: 152, avgDays: 25, status: 'Low' },
  { payer: 'Medicaid', amount: 45000, claims: 135, avgDays: 42, status: 'Critical' },
];

const unremittedMetrics = [
  { title: 'Total Unremitted', value: '$420K', change: '-8.2%', icon: DollarSign, color: 'from-red-500 to-pink-600' },
  { title: 'Outstanding Claims', value: '1,095', change: '-12', icon: FileText, color: 'from-orange-500 to-red-500' },
  { title: 'Avg. Days Outstanding', value: '31.5', change: '-2.3', icon: Clock, color: 'from-blue-500 to-indigo-600' },
  { title: 'Collection Rate', value: '87.3%', change: '+3.1%', icon: TrendingDown, color: 'from-purple-500 to-violet-600' },
];

const recentUnremitted = [
  { id: 'UR-2024-001', patient: 'Alice Johnson', payer: 'Medicare', amount: '$2,450', days: 45, priority: 'High', date: '2023-12-01' },
  { id: 'UR-2024-002', patient: 'Bob Smith', payer: 'Aetna', amount: '$1,850', days: 32, priority: 'Medium', date: '2023-12-15' },
  { id: 'UR-2024-003', patient: 'Carol Davis', payer: 'Blue Cross', amount: '$3,200', days: 58, priority: 'Critical', date: '2023-11-28' },
  { id: 'UR-2024-004', patient: 'David Wilson', payer: 'Cigna', amount: '$1,650', days: 28, priority: 'Low', date: '2023-12-18' },
  { id: 'UR-2024-005', patient: 'Eva Brown', payer: 'Medicaid', amount: '$2,100', days: 67, priority: 'Critical', date: '2023-11-15' },
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

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'Critical': return 'bg-red-100 text-red-800';
    case 'High': return 'bg-orange-100 text-orange-800';
    case 'Medium': return 'bg-yellow-100 text-yellow-800';
    case 'Low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Critical': return 'bg-red-100 text-red-800';
    case 'High Priority': return 'bg-orange-100 text-orange-800';
    case 'Medium': return 'bg-yellow-100 text-yellow-800';
    case 'Low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const UnremittedPage = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredUnremitted = recentUnremitted.filter(item =>
    item.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.payer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Unremitted Claims Management</h1>
        <p className="text-gray-600">Track and manage outstanding claims awaiting payment from insurance providers</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {unremittedMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            icon={metric.icon}
            value={metric.value}
            title={metric.title}
            change={metric.change}
            color={metric.color}
            delay={index * 100}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Unremitted Trends Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 slide-up">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Unremitted Trends</h3>
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
              <LineChart data={unremittedTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="claims" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Aging Buckets Chart */}
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
      </div>

      {/* Payer Analysis and Search */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Payer-wise Analysis */}
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

        {/* Recent Unremitted Claims */}
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
      </div>

      {/* Aging Buckets Summary Table */}
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
    </div>
  );
};

export default UnremittedPage;

