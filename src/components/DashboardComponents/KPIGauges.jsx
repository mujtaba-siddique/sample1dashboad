import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Mock data for KPI gauges
const kpiData = [
  {
    title: "Collection Rate",
    value: 92,
    color: "#10b981",
    delay: 0,
  },
  {
    title: "Clean Claim Rate",
    value: 94,
    color: "#3b82f6",
    delay: 100,
  },
  {
    title: "Net Collection",
    value: 97,
    color: "#8b5cf6",
    delay: 200,
  },
  {
    title: "First Pass Rate",
    value: 89,
    color: "#f59e0b",
    delay: 300,
  },
];

// Advanced Gauge Chart Component (matching AdvancedCharts design)
const GaugeChart = ({ value, max = 100, label, color }) => {
  const percentage = (value / max) * 100;
  
  const chartData = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [color, 'rgba(229, 231, 235, 0.3)'],
        borderWidth: 0,
        cutout: '75%',
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="relative">
      <Doughnut data={chartData} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-gray-900">{value}%</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </div>
  );
};

const KPIGauges = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {kpiData.map((kpi, index) => (
        <div
          key={index}
          className="chart-container p-6 slide-up"
          style={{ animationDelay: `${kpi.delay}ms` }}
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            {kpi.title}
          </h4>
          <div style={{ height: "120px" }}>
            <GaugeChart
              value={kpi.value}
              max={100}
              label=""
              color={kpi.color}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPIGauges;
