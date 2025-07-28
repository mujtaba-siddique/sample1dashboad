import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Mock data for monthly revenue
const monthlyRevenueData = [
  { month: "Jan", revenue: 45000, claims: 320, target: 50000 },
  { month: "Feb", revenue: 52000, claims: 380, target: 50000 },
  { month: "Mar", revenue: 48000, claims: 350, target: 50000 },
  { month: "Apr", revenue: 61000, claims: 420, target: 55000 },
  { month: "May", revenue: 55000, claims: 390, target: 55000 },
  { month: "Jun", revenue: 67000, claims: 450, target: 60000 },
];

// Advanced Line Chart Component (matching AdvancedCharts design)
const AdvancedLineChart = ({ data, title }) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Revenue',
        data: data.map(item => item.revenue),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'Target',
        data: data.map(item => item.target),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
        pointBackgroundColor: 'rgb(239, 68, 68)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: 'rgb(17, 24, 39)',
        bodyColor: 'rgb(75, 85, 99)',
        borderColor: 'rgb(229, 231, 235)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: 'rgb(107, 114, 128)',
        },
      },
      y: {
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
        },
        ticks: {
          font: {
            size: 11,
          },
          color: 'rgb(107, 114, 128)',
          callback: function(value) {
            return '$' + (value / 1000) + 'K';
          }
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return <Line data={chartData} options={options} />;
};

const RevenueChart = () => {
  return (
    <div
      className="lg:col-span-6 chart-container p-6 slide-up"
      style={{ animationDelay: "200ms" }}
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Revenue vs Target
      </h3>
      <div style={{ height: "350px" }}>
        <AdvancedLineChart
          data={monthlyRevenueData}
          title="Revenue vs Target"
        />
      </div>
    </div>
  );
};

export default RevenueChart;