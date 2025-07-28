import React from "react";
import { useLocation } from "react-router-dom";
import {
  X,
  Activity,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const Sidebar = ({ 
  sidebarOpen, 
  sidebarCollapsed, 
  setSidebarCollapsed, 
  toggleSidebar, 
  handleNavClick, 
  navigationItems 
}) => {
  const location = useLocation();

  return (
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
  );
};

export default Sidebar;
