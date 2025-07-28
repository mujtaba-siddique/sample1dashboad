import React, { useState, useEffect } from 'react';
import InsuranceMetrics from '../components/InsuranceComponents/InsuranceMetrics.jsx';
import ClaimsTrendChart from '../components/InsuranceComponents/ClaimsTrendChart.jsx';
import InsuranceTypesChart from '../components/InsuranceComponents/InsuranceTypesChart.jsx';
import DenialReasonsChart from '../components/InsuranceComponents/DenialReasonsChart.jsx';
import RecentClaimsTable from '../components/InsuranceComponents/RecentClaimsTable.jsx';
import InsurancePerformanceTable from '../components/InsuranceComponents/InsurancePerformanceTable.jsx';

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
      <InsuranceMetrics />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ClaimsTrendChart />
        <InsuranceTypesChart />
      </div>

      {/* Denial Reasons and Recent Claims */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DenialReasonsChart />
        <RecentClaimsTable />
      </div>

      {/* Insurance Performance Table */}
      <InsurancePerformanceTable />
    </div>
  );
};

export default InsurancePage;
