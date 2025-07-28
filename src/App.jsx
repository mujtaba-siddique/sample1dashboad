import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  Menu,
  X,
  Bell,
  BarChart3,
  FileText,
  Shield,
  Users,
  TrendingUp,
  Calendar,
  AlertTriangle,
  DollarSign,
  Activity,
  Search,
  Settings,
  User,
  ChevronDown,
  Download,
  Filter,
  RefreshCw,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  AdvancedLineChart,
  AdvancedBarChart,
  AdvancedDoughnutChart,
  GaugeChart,
  MultiLineChart,
} from "./components/AdvancedCharts";
import InsurancePage from "./pages/InsurancePage";
import UnremittedPage from "./pages/UnremittedPage";
import "./App.css";

// -------------  SAMPLE DATA / ICONS  -------------
const claimStatusData = [
  { name: "Paid", value: 65, color: "#10b981" },
  { name: "Pending", value: 20, color: "#f59e0b" },
  { name: "Denied", value: 10, color: "#ef4444" },
  { name: "Under Review", value: 5, color: "#3b82f6" },
];

const monthlyRevenueData = [
  { month: "Jan", revenue: 45000, claims: 320, target: 50000 },
  { month: "Feb", revenue: 52000, claims: 380, target: 50000 },
  { month: "Mar", revenue: 48000, claims: 350, target: 50000 },
  { month: "Apr", revenue: 61000, claims: 420, target: 55000 },
  { month: "May", revenue: 55000, claims: 390, target: 55000 },
  { month: "Jun", revenue: 67000, claims: 450, target: 60000 },
];

const insuranceTypeData = [
  { type: "Medicare", amount: 125000, percentage: 30.4 },
  { type: "Medicaid", amount: 98000, percentage: 23.8 },
  { type: "Private", amount: 156000, percentage: 37.9 },
  { type: "Self-Pay", amount: 32000, percentage: 7.8 },
];

const agingReportData = [
  { range: "0-30 days", amount: 45000, count: 120, status: "good" },
  { range: "31-60 days", amount: 28000, count: 85, status: "warning" },
  { range: "61-90 days", amount: 15000, count: 45, status: "danger" },
  { range: "90+ days", amount: 8000, count: 25, status: "critical" },
];

const navigationItems = [
  { text: "Dashboard", icon: BarChart3, path: "/", badge: null },
  { text: "Insurance", icon: Shield, path: "/insurance", badge: "12" },
  { text: "Unremitted", icon: AlertTriangle, path: "/unremitted", badge: "5" },
  { text: "Service Class", icon: Users, path: "/service-class", badge: null },
  {
    text: "Service Distribution",
    icon: Activity,
    path: "/service-distribution",
    badge: null,
  },
  { text: "Sub Aging", icon: Calendar, path: "/sub-aging", badge: "3" },
  {
    text: "Rejection Analysis",
    icon: FileText,
    path: "/rejection-analysis",
    badge: null,
  },
  {
    text: "Pending Resub",
    icon: AlertTriangle,
    path: "/pending-resub",
    badge: "8",
  },
  {
    text: "Claim Average",
    icon: TrendingUp,
    path: "/claim-average",
    badge: null,
  },
  {
    text: "Settlement Report",
    icon: FileText,
    path: "/settlement-report",
    badge: null,
  },
];

// -------------  HELPER COMPONENTS  -------------
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-900">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}:{" "}
            {typeof entry.value === "number"
              ? entry.value.toLocaleString()
              : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

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

const LoadingSkeleton = ({ className }) => (
  <div className={`loading-skeleton ${className}`}></div>
);

// -------------  DASHBOARD  -------------
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon={DollarSign}
          value="$342K"
          label="Total Revenue"
          color="from-green-500 to-emerald-600"
          delay={0}
        />
        <MetricCard
          icon={FileText}
          value="1,245"
          label="Total Claims"
          color="from-blue-500 to-indigo-600"
          delay={100}
        />
        <MetricCard
          icon={TrendingUp}
          value="92%"
          label="Collection Rate"
          color="from-purple-500 to-violet-600"
          delay={200}
        />
        <MetricCard
          icon={AlertTriangle}
          value="$28K"
          label="Outstanding AR"
          color="from-orange-500 to-red-500"
          delay={300}
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div className="lg:col-span-6 chart-container p-6 slide-up">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Claim Status Distribution
          </h3>
          <div style={{ height: "350px" }}>
            <AdvancedDoughnutChart
              data={claimStatusData}
              title="Claim Status Distribution"
            />
          </div>
        </div>

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
      </div>

      {/* KPI Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[92, 94, 97, 89].map((v, i) => (
          <div
            key={i}
            className="chart-container p-6 slide-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              {["Collection Rate", "Clean Claim Rate", "Net Collection", "First Pass Rate"][i]}
            </h4>
            <div style={{ height: "120px" }}>
              <GaugeChart
                value={v}
                max={100}
                label=""
                color={["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"][i]}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Extra Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="chart-container p-6 slide-up">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Insurance Type Distribution
          </h3>
          <div style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={insuranceTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="type" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

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
      </div>
    </div>
  );
};

// -------------  MAIN APP CONTENT  -------------
const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleNavClick = (item) => {
    navigate(item.path);
    setSidebarOpen(false);
  };

  const getCurrentPageTitle = () =>
    navigationItems.find((item) => item.path === location.pathname)?.text ||
    "Dashboard";

  if (loading) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="w-64 bg-white shadow-lg p-4">
          <LoadingSkeleton className="h-12 mb-4" />
          {[...Array(8)].map((_, i) => (
            <LoadingSkeleton key={i} className="h-10 mb-2" />
          ))}
        </div>
        <div className="flex-1 p-6">
          <LoadingSkeleton className="h-8 w-64 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <LoadingSkeleton key={i} className="h-32" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <LoadingSkeleton key={i} className="h-64" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* ----- Sidebar ----- */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white/95 backdrop-blur-sm shadow-xl border-r border-gray-200/50 transform transition-all duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0 custom-scrollbar overflow-y-auto flex flex-col ${
          sidebarCollapsed ? "w-20" : "w-72"
        } ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-300 bg-gradient-to-r from-blue-200 to-purple-400">
          {!sidebarCollapsed && (
            <div className="flex items-center">
              <Activity className="h-6 w-6 text-blue-600" />
              <div className="ml-2">
                <p className="text-lg font-bold text-gray-800">HealthCare RCM</p>
                <p className="text-xs text-gray-500">Dashboard v2.0</p>
              </div>
            </div>
          )}
          <div className="flex items-center">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-2 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors"
              title={sidebarCollapsed ? "Expand" : "Collapse"}
            >
              {sidebarCollapsed ? (
                <ChevronsRight className="h-5 w-5" />
              ) : (
                <ChevronsLeft className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* User Profile */}
        {!sidebarCollapsed && (
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-200 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                G
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-900">Gavano</p>
                <p className="text-xs text-gray-500">RCM Manager</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-3 space-y-1 flex-1">
          {navigationItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = item.path === location.pathname;
            return (
              <button
                key={index}
                onClick={() => handleNavClick(item)}
                className={`sidebar-item w-full flex items-center transition duration-300 ease-in-out rounded-md px-2 py-2 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-200 to-purple-400 text-black"
                    : "hover:bg-gray-100"
                }`}
              >
                <IconComponent
                  className={`h-5 w-5 ${
                    isActive ? "text-white" : "text-gray-600"
                  } ${!sidebarCollapsed ? "mr-3" : ""}`}
                />
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 text-left text-sm">
                      {item.text}
                    </span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-600">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ----- Main Content ----- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-bold text-gray-900 lg:hidden">
                {getCurrentPageTitle()}
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              {/* <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" /> */}
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-3 py-2 w-64 bg-gray-100 border-0 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
              <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                <Settings className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Routes */}
        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/insurance" element={<InsurancePage />} />
            <Route path="/unremitted" element={<UnremittedPage />} />
            <Route path="/service-class" element={<div className="p-6"><h1 className="text-2xl font-bold">Service Class - Coming Soon</h1></div>} />
            <Route path="/service-distribution" element={<div className="p-6"><h1 className="text-2xl font-bold">Service Distribution - Coming Soon</h1></div>} />
            <Route path="/sub-aging" element={<div className="p-6"><h1 className="text-2xl font-bold">Sub Aging - Coming Soon</h1></div>} />
            <Route path="/rejection-analysis" element={<div className="p-6"><h1 className="text-2xl font-bold">Rejection Analysis - Coming Soon</h1></div>} />
            <Route path="/pending-resub" element={<div className="p-6"><h1 className="text-2xl font-bold">Pending Resub - Coming Soon</h1></div>} />
            <Route path="/claim-average" element={<div className="p-6"><h1 className="text-2xl font-bold">Claim Average - Coming Soon</h1></div>} />
            <Route path="/settlement-report" element={<div className="p-6"><h1 className="text-2xl font-bold">Settlement Report - Coming Soon</h1></div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// -------------  ROOT APP  -------------
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;