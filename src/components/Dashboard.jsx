import React from "react";
import MetricCards from "./DashboardComponents/MetricCards.jsx";
import ClaimStatusChart from "./DashboardComponents/ClaimStatusChart.jsx";
import RevenueChart from "./DashboardComponents/RevenueChart.jsx";
import KPIGauges from "./DashboardComponents/KPIGauges.jsx";
import InsuranceTypeChart from "./DashboardComponents/InsuranceTypeChart.jsx";
import AgingReportChart from "./DashboardComponents/AgingReportChart.jsx";

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Healthcare RCM Dashboard
        </h1>
        <p className="text-gray-600">
          Monitor your revenue cycle management performance and key metrics
        </p>
      </div>

      {/* Key Metrics */}
      <MetricCards />

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <ClaimStatusChart />
        <RevenueChart />
      </div>

      {/* KPI Gauges */}
      <KPIGauges />

      {/* Extra Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <InsuranceTypeChart />
        <AgingReportChart />
      </div>
    </div>
  );
};

export default Dashboard;
