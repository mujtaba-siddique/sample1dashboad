import React from "react";
import {
  DollarSign,
  FileText,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

// Mock data for metric cards
const metricsData = [
  {
    icon: DollarSign,
    value: "$342K",
    label: "Total Revenue",
    color: "from-green-500 to-emerald-600",
    delay: 0,
  },
  {
    icon: FileText,
    value: "1,245",
    label: "Total Claims",
    color: "from-blue-500 to-indigo-600",
    delay: 100,
  },
  {
    icon: TrendingUp,
    value: "92%",
    label: "Collection Rate",
    color: "from-purple-500 to-violet-600",
    delay: 200,
  },
  {
    icon: AlertTriangle,
    value: "$28K",
    label: "Outstanding AR",
    color: "from-orange-500 to-red-500",
    delay: 300,
  },
];

const MetricCard = ({
  icon: Icon,
  value,
  label,
  change,
  changeType,
  color,
  delay = 0,
}) => (
  <div
    className={`metric-card p-6 fade-in`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      {change && (
        <div
          className={`flex items-center text-sm font-medium ${
            changeType === "positive" ? "text-green-600" : "text-red-600"
          }`}
        >
          <TrendingUp
            className={`h-4 w-4 mr-1 ${
              changeType === "negative" ? "rotate-180" : ""
            }`}
          />
          {change}
        </div>
      )}
    </div>
    <div className="mt-4">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600 mt-1">{label}</p>
    </div>
  </div>
);

const MetricCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricsData.map((metric, index) => (
        <MetricCard
          key={index}
          icon={metric.icon}
          value={metric.value}
          label={metric.label}
          color={metric.color}
          delay={metric.delay}
        />
      ))}
    </div>
  );
};

export default MetricCards;