// import React, { useState, useEffect } from 'react';
// import { BarChart3, Users, TrendingUp, DollarSign, Activity, Calendar, FileText, AlertTriangle } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// // Sample data for Ismey page
// const ismeyPatientData = [
//   { month: 'Jan', patients: 145, revenue: 28000, satisfaction: 4.2 },
//   { month: 'Feb', patients: 162, revenue: 32000, satisfaction: 4.4 },
//   { month: 'Mar', patients: 178, revenue: 35000, satisfaction: 4.3 },
//   { month: 'Apr', patients: 195, revenue: 38000, satisfaction: 4.5 },
//   { month: 'May', patients: 210, revenue: 42000, satisfaction: 4.6 },
//   { month: 'Jun', patients: 225, revenue: 45000, satisfaction: 4.7 },
// ];

// const ismeyServiceData = [
//   { service: 'Cardiology', patients: 85, revenue: 15000, color: '#3b82f6' },
//   { service: 'Orthopedics', patients: 72, revenue: 12000, color: '#10b981' },
//   { service: 'Neurology', patients: 45, revenue: 8000, color: '#f59e0b' },
//   { service: 'Pediatrics', patients: 38, revenue: 6000, color: '#ef4444' },
//   { service: 'General', patients: 95, revenue: 9000, color: '#8b5cf6' },
// ];

// const ismeyMetrics = [
//   { title: 'Total Patients', value: '1,245', change: '+12%', icon: Users, color: 'from-blue-500 to-indigo-600' },
//   { title: 'Monthly Revenue', value: '$45,000', change: '+8%', icon: DollarSign, color: 'from-green-500 to-emerald-600' },
//   { title: 'Satisfaction Rate', value: '4.7/5', change: '+0.3', icon: TrendingUp, color: 'from-purple-500 to-violet-600' },
//   { title: 'Active Cases', value: '89', change: '+5', icon: Activity, color: 'from-orange-500 to-red-500' },
// ];

// const MetricCard = ({ icon: Icon, value, title, change, color, delay = 0 }) => (
//   <div className={`bg-white rounded-xl shadow-lg p-6 fade-in`} style={{ animationDelay: `${delay}ms` }}>
//     <div className="flex items-center justify-between">
//       <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
//         <Icon className="h-6 w-6 text-white" />
//       </div>
//       <div className="text-right">
//         <p className="text-2xl font-bold text-gray-900">{value}</p>
//         <p className="text-sm text-green-600 font-medium">{change}</p>
//       </div>
//     </div>
//     <div className="mt-4">
//       <p className="text-sm text-gray-600">{title}</p>
//     </div>
//   </div>
// );

// const IsmeyPage = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 800);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="p-6">
//         <div className="animate-pulse">
//           <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {[...Array(4)].map((_, i) => (
//               <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
//             ))}
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {[...Array(2)].map((_, i) => (
//               <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       {/* Page Header */}
//       <div className="mb-8 fade-in">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Ismey Healthcare Analytics</h1>
//         <p className="text-gray-600">Comprehensive patient care and revenue analytics for Ismey department</p>
//       </div>

//       {/* Metrics Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {ismeyMetrics.map((metric, index) => (
//           <MetricCard
//             key={index}
//             icon={metric.icon}
//             value={metric.value}
//             title={metric.title}
//             change={metric.change}
//             color={metric.color}
//             delay={index * 100}
//           />
//         ))}
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {/* Patient Trends Chart */}
//         <div className="bg-white rounded-xl shadow-lg p-6 slide-up">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-xl font-semibold text-gray-900">Patient & Revenue Trends</h3>
//             <div className="flex items-center space-x-2">
//               <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
//               <span className="text-sm text-gray-600">Patients</span>
//               <span className="w-3 h-3 bg-green-500 rounded-full ml-4"></span>
//               <span className="text-sm text-gray-600">Revenue</span>
//             </div>
//           </div>
//           <div style={{ height: '300px' }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={ismeyPatientData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                 <XAxis dataKey="month" stroke="#6b7280" />
//                 <YAxis yAxisId="left" stroke="#6b7280" />
//                 <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
//                 <Tooltip />
//                 <Line 
//                   yAxisId="left"
//                   type="monotone" 
//                   dataKey="patients" 
//                   stroke="#3b82f6" 
//                   strokeWidth={3}
//                   dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
//                 />
//                 <Line 
//                   yAxisId="right"
//                   type="monotone" 
//                   dataKey="revenue" 
//                   stroke="#10b981" 
//                   strokeWidth={3}
//                   dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Service Distribution Chart */}
//         <div className="bg-white rounded-xl shadow-lg p-6 slide-up" style={{ animationDelay: '200ms' }}>
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-xl font-semibold text-gray-900">Service Distribution</h3>
//             <button className="text-sm text-blue-600 hover:text-blue-800">View Details</button>
//           </div>
//           <div style={{ height: '300px' }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={ismeyServiceData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="patients"
//                   label={({ service, patients }) => `${service}: ${patients}`}
//                 >
//                   {ismeyServiceData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Service Performance Table */}
//       <div className="bg-white rounded-xl shadow-lg p-6 slide-up" style={{ animationDelay: '400ms' }}>
//         <div className="flex items-center justify-between mb-6">
//           <h3 className="text-xl font-semibold text-gray-900">Service Performance</h3>
//           <div className="flex space-x-2">
//             <button className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
//               Export Data
//             </button>
//             <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
//               Filter
//             </button>
//           </div>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-200">
//                 <th className="text-left py-3 px-4 font-semibold text-gray-900">Service</th>
//                 <th className="text-left py-3 px-4 font-semibold text-gray-900">Patients</th>
//                 <th className="text-left py-3 px-4 font-semibold text-gray-900">Revenue</th>
//                 <th className="text-left py-3 px-4 font-semibold text-gray-900">Avg. per Patient</th>
//                 <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {ismeyServiceData.map((service, index) => (
//                 <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
//                   <td className="py-3 px-4">
//                     <div className="flex items-center">
//                       <div 
//                         className="w-3 h-3 rounded-full mr-3" 
//                         style={{ backgroundColor: service.color }}
//                       ></div>
//                       <span className="font-medium text-gray-900">{service.service}</span>
//                     </div>
//                   </td>
//                   <td className="py-3 px-4 text-gray-600">{service.patients}</td>
//                   <td className="py-3 px-4 text-gray-600">${service.revenue.toLocaleString()}</td>
//                   <td className="py-3 px-4 text-gray-600">${Math.round(service.revenue / service.patients)}</td>
//                   <td className="py-3 px-4">
//                     <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
//                       Active
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IsmeyPage;

