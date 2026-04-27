'use client'
import React, { useState } from "react";
import {
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
} from "lucide-react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      href: "/dashboard",
    },
    { name: "Profile", icon: <User size={20} />, href: "/dashboard/profile" },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      href: "/dashboard/settings",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* --- Sidebar (Desktop & Mobile) --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 transform
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-slate-950">
          <span className="text-xl font-bold tracking-wider text-indigo-400">
            MY APP
          </span>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors"
            >
              {item.icon}
              <span className="ml-3 font-medium">{item.name}</span>
            </a>
          ))}

          <button className="flex items-center w-full px-4 py-3 mt-10 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <LogOut size={20} />
            <span className="ml-3 font-medium">Logout</span>
          </button>
        </nav>
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex items-center justify-between h-16 px-8 bg-white shadow-sm border-b">
          <button
            className="lg:hidden text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center ml-auto space-x-4">
            <button className="p-2 text-gray-400 hover:text-indigo-600 relative">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              U
            </div>
          </div>
        </header>

        {/* Dashboard Pages Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
