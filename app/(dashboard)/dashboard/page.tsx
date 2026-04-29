"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Image as ImageIcon,
  MessageSquare,
  TrendingUp,
  MoreHorizontal,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Dashboard = () => {
  // Static data for Stats
  const stats = [
    {
      label: "Total Students",
      value: "2,845",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Active Events",
      value: "12",
      icon: Calendar,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "Campus Posts",
      value: "156",
      icon: ImageIcon,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "New Inquiries",
      value: "48",
      icon: MessageSquare,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  // Chart 1: Enrollment Growth (Area Chart)
  const growthData = [
    { name: "Jan", students: 2100 },
    { name: "Feb", students: 2250 },
    { name: "Mar", students: 2400 },
    { name: "Apr", students: 2845 },
  ];

  // Chart 2: Student Category Distribution (Pie Chart)
  const pieData = [
    { name: "Engineering", value: 400 },
    { name: "Business", value: 300 },
    { name: "Arts", value: 200 },
    { name: "Science", value: 100 },
  ];
  const COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"];

  // Chart 3: Event Engagement (Bar Chart)
  const engagementData = [
    { name: "Tech Fest", views: 4000, registrations: 2400 },
    { name: "Cultural", views: 3000, registrations: 1398 },
    { name: "Sports", views: 2000, registrations: 9800 },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans flex">
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen ">
        <div className="p-8 space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Campus Analytics Overview 👋
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Real-time data for student growth and event performance.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1E293B] p-6 rounded-xl border border-slate-700 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <TrendingUp size={16} className="text-emerald-500" />
                </div>
                <h3 className="text-slate-400 text-sm font-medium">
                  {stat.label}
                </h3>
                <p className="text-2xl font-bold text-white mt-1">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Charts Row 1: Area and Pie */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart 1: Student Growth */}
            <div className="bg-[#1E293B] p-6 rounded-xl border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <TrendingUp size={18} className="text-blue-500" /> Enrollment
                  Trends
                </h3>
                <MoreHorizontal
                  size={18}
                  className="text-slate-500 cursor-pointer"
                />
              </div>
              <div className="h-62.5 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData}>
                    <defs>
                      <linearGradient
                        id="colorStudents"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3B82F6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3B82F6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#334155"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      stroke="#64748b"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#64748b"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#020617",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="students"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorStudents)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Faculty Distribution */}
            <div className="bg-[#1E293B] p-6 rounded-xl border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Users size={18} className="text-emerald-500" /> Department
                  Ratio
                </h3>
                <MoreHorizontal
                  size={18}
                  className="text-slate-500 cursor-pointer"
                />
              </div>
              <div className="h-62.5 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#020617",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Chart Row 2: Bar Chart Engagement */}
          <div className="bg-[#1E293B] p-6 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Calendar size={18} className="text-purple-500" /> Event
                Engagement Analytics
              </h3>
              <div className="flex gap-2">
                <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-500">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div> Views
                </div>
                <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-500">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>{" "}
                  Regs
                </div>
              </div>
            </div>
            <div className="h-75 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "#0f172a" }}
                    contentStyle={{
                      backgroundColor: "#020617",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="views"
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  />
                  <Bar
                    dataKey="registrations"
                    fill="#8B5CF6"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <footer className="mt-auto px-8 py-4 bg-[#020617] border-t border-slate-800 text-center">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[3px]">
            CMS Analytics Portal — Powered by Recharts
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
