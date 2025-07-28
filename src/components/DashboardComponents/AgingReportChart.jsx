import React from "react";

// Mock data for aging report
const agingReportData = [
  { range: "0-30 days", amount: 45000, count: 120, status: "good" },
  { range: "31-60 days", amount: 28000, count: 85, status: "warning" },
  { range: "61-90 days", amount: 15000, count: 45, status: "danger" },
  { range: "90+ days", amount: 8000, count: 25, status: "critical" },
];

const AgingReportChart = () => {
  return (
    <div className="chart-container p-6 slide-up">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Accounts Receivable Aging
      </h3>
      <div className="space-y-4">
        {agingReportData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <p className="font-medium text-gray-900">{item.range}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full ${
                    item.status === "good"
                      ? "bg-green-500"
                      : item.status === "warning"
                      ? "bg-yellow-500"
                      : item.status === "danger"
                      ? "bg-orange-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${(item.amount / 45000) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="ml-4 text-right">
              <p className="text-lg font-bold text-gray-900">
                ${item.amount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">{item.count} claims</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgingReportChart;