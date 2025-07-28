import React from 'react';
import { AlertTriangle, DollarSign, Clock, FileText, TrendingDown } from 'lucide-react';

// Mock data for unremitted metrics
const unremittedMetrics = [
  { title: 'Total Unremitted', value: '$420K', change: '-8.2%', icon: DollarSign, color: 'from-red-500 to-pink-600' },
  { title: 'Outstanding Claims', value: '1,095', change: '-12', icon: FileText, color: 'from-orange-500 to-red-500' },
  { title: 'Avg. Days Outstanding', value: '31.5', change: '-2.3', icon: Clock, color: 'from-blue-500 to-indigo-600' },
  { title: 'Collection Rate', value: '87.3%', change: '+3.1%', icon: TrendingDown, color: 'from-purple-500 to-violet-600' },
];

const MetricCard = ({ icon: Icon, value, title, change, color, delay = 0 }) => (
  <div className={`bg-white rounded-xl shadow-lg p-6 fade-in`} style={{ animationDelay: `${delay}ms` }}>
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {/* <p className={`text-sm font-medium ${change.includes('+') ? 'text-green-600' : change.includes('-') ? 'text-red-600' : 'text-gray-600'}`}>
          {change}
        </p> */}
      </div>
    </div>
    <div className="mt-4">
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  </div>
);

const UnremittedMetrics = () => {
  return (
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
  );
};

export default UnremittedMetrics;