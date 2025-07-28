import React from 'react';
import { Shield, DollarSign, FileText, Calendar } from 'lucide-react';

// Mock data for insurance metrics
const insuranceMetrics = [
  { title: 'Total Claims', value: '2,025', change: '+8.5%', icon: FileText, color: 'from-blue-500 to-indigo-600' },
  { title: 'Approval Rate', value: '91.2%', change: '+2.1%', icon: Shield, color: 'from-green-500 to-emerald-600' },
  { title: 'Total Revenue', value: '$1.2M', change: '+12.3%', icon: DollarSign, color: 'from-purple-500 to-violet-600' },
  { title: 'Avg Processing Time', value: '4.2 days', change: '-0.8 days', icon: Calendar, color: 'from-orange-500 to-red-500' },
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

const InsuranceMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {insuranceMetrics.map((metric, index) => (
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

export default InsuranceMetrics;
