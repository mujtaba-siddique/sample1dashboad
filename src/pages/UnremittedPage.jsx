import React, { useState, useEffect } from 'react';
import UnremittedMetrics from '../components/UnRemittedComponents/UnremittedMetrics.jsx';
import UnremittedTrendsChart from '../components/UnRemittedComponents/UnremittedTrendsChart.jsx';
import AgingBucketsChart from '../components/UnRemittedComponents/AgingBucketsChart.jsx';
import PayerAnalysisChart from '../components/UnRemittedComponents/PayerAnalysisChart.jsx';
import RecentUnremittedTable from '../components/UnRemittedComponents/RecentUnremittedTable.jsx';
import AgingBucketsTable from '../components/UnRemittedComponents/AgingBucketsTable.jsx';

const UnremittedPage = () => {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Unremitted Claims Management</h1>
        <p className="text-gray-600">Track and manage outstanding claims awaiting payment from insurance providers</p>
      </div>

      {/* Metrics Grid */}
      <UnremittedMetrics />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <UnremittedTrendsChart />
        <AgingBucketsChart />
      </div>

      {/* Payer Analysis and Search */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PayerAnalysisChart />
        <RecentUnremittedTable />
      </div>

      {/* Aging Buckets Summary Table */}
      <AgingBucketsTable />
    </div>
  );
};

export default UnremittedPage;