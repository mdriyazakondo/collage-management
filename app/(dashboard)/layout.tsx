"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Bell,
  GraduationCap,
  User,
} from "lucide-react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      href: "/dashboard",
    },
    {
      name: "All Users",
      icon: <User />,
      href: "/dashboard/users/all_user",
    },
    {
      name: "Campus Files",
      icon: <GraduationCap size={20} />,
      href: "/dashboard/campus_file/create_campus",
    },
    {
      name: "Events",
      icon: <GraduationCap size={20} />,
      href: "/dashboard/events/create_event",
    },
    {
      name: "All Events",
      icon: <GraduationCap size={20} />,
      href: "/dashboard/events/all_events",
    },
    {
      name: "Blogs",
      icon: <GraduationCap size={20} />,
      href: "/dashboard/blog/create_blog",
    },
  ];

  return (
    <div className="flex h-screen bg-[#0F172A] text-slate-200 font-sans">
      {/* --- Sidebar (Desktop & Mobile) --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1E293B] text-white transition-transform duration-300 transform border-r border-slate-800
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-[#020617] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-600 rounded-md">
              <GraduationCap size={18} className="text-white" />
            </div>
            <span className="text-sm font-bold tracking-[2px] text-white uppercase">
              My App
            </span>
          </div>
          <button
            className="lg:hidden text-slate-400"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-3 text-slate-400 hover:bg-blue-600/10 hover:text-blue-400 rounded-lg transition-all border border-transparent hover:border-blue-500/20"
            >
              {item.icon}
              <span className="ml-3 font-semibold text-sm">{item.name}</span>
            </a>
          ))}

          <button className="flex items-center w-full px-4 py-3 mt-10 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20">
            <LogOut size={20} />
            <span className="ml-3 font-semibold text-sm">Logout</span>
          </button>
        </nav>
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex items-center justify-between h-16 px-8 bg-[#020617] border-b border-slate-800">
          <button
            className="lg:hidden text-slate-400"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center ml-auto space-x-6">
            <button className="p-2 text-slate-400 hover:text-blue-400 relative transition-colors">
              <Bell size={22} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#020617]"></span>
            </button>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white">Admin User</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                  Faculty
                </p>
              </div>
              <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-black shadow-lg shadow-blue-900/20">
                U
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Pages Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0F172A] p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
