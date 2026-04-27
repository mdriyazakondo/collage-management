"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  HiOutlineBookOpen,
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineChartSquareBar,
} from "react-icons/hi";
import { BiArrowFromRight, BiBuildings } from "react-icons/bi";

const AccountingDepartment = () => {
  const academicYears = [
    {
      year: "1st Year",
      title: "Foundation",
      icon: <HiOutlineBookOpen size={22} />,
    },
    {
      year: "2nd Year",
      title: "Intermediate",
      icon: <HiOutlineChartSquareBar size={22} />,
    },
    { year: "3rd Year", title: "Advanced", icon: <BiBuildings size={22} /> },
    {
      year: "4th Year",
      title: "Strategic",
      icon: <HiOutlineAcademicCap size={22} />,
    },
    {
      year: "Masters",
      title: "Professional",
      icon: <HiOutlineUserGroup size={22} />,
    },
  ];

  const courses = [
    "Financial Accounting",
    "Cost Management",
    "Audit & Tax",
    "Corporate Law",
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Minimal Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tighter">
              Accounting <span className="text-yellow-500">Syllabus</span>
            </h2>
            <div className="h-1 w-20 bg-yellow-500 mt-2"></div>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
            Faculty of Business Studies • 2026/27
          </p>
        </div>

        {/* Compact Grid: Fixed Heights, Clean Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {academicYears.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ borderColor: "#10b981" }} // yellow-500
              className="bg-white border-2 border-slate-100 p-6 rounded-xl transition-all duration-300 group flex flex-col justify-between min-h-[380px]"
            >
              <div>
                {/* Top Row: Year & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-black text-blue-900 bg-slate-50 px-2 py-1 rounded border border-slate-100 uppercase tracking-widest">
                    {item.year}
                  </span>
                  <div className="text-slate-300 group-hover:text-yellow-500 transition-colors">
                    {item.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-blue-900 mb-6 leading-tight group-hover:text-yellow-600 transition-colors">
                  {item.title} <br />
                  Studies
                </h3>

                {/* Course List: Compacted */}
                <ul className="space-y-3">
                  {courses.map((course, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 bg-yellow-500 rounded-full shrink-0"></span>
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight leading-tight">
                        {course}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Action: Compact */}
              <motion.button
                whileHover={{ x: 3 }}
                className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between w-full group/btn"
              >
                <span className="text-[10px] font-black text-slate-400 group-hover:text-blue-900 uppercase tracking-widest transition-colors">
                  View Syllabus
                </span>
                <BiArrowFromRight
                  size={18}
                  className="text-slate-200 group-hover:text-yellow-500 transition-colors"
                />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccountingDepartment;
