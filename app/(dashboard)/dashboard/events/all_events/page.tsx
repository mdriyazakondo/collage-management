"use client";

import { useGetAllEventsQuery } from "@/redux/service/event/eventApi";
import {
  Search,
  MapPin,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
  Tag,
  Calendar,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const getStatusBadge = (status: string) => {
  const baseStyle = "px-3 py-1 rounded-full text-xs font-semibold";

  switch (status) {
    case "Upcoming":
      return `${baseStyle} bg-blue-500/20 text-blue-400`;
    case "Completed":
      return `${baseStyle} bg-green-500/20 text-green-400`;
    case "Cancelled":
      return `${baseStyle} bg-red-500/20 text-red-400`;
    default:
      return `${baseStyle} bg-slate-500/20 text-slate-400`;
  }
};

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [page, setPage] = useState(1);

  const limit = 10;

  const pathName = `?search=${searchTerm}&eventType=${selectedType}&page=${page}&limit=${limit}`;

  const {
    data: apiResponse,
    isLoading,
    error,
  } = useGetAllEventsQuery(pathName);

  const events = apiResponse?.data || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-red-400">
        Something went wrong! Please try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] p-4 md:p-8 text-slate-200">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Event Management
            </h1>
            <p className="text-slate-400 text-sm">
              Total {events.length} টি event পাওয়া গিয়েছে
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                placeholder="Event খুঁজুন..."
                className="bg-[#1E293B] border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <select
                className="bg-[#1E293B] border border-slate-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-blue-500 cursor-pointer text-slate-300 w-full sm:w-48 appearance-none"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">All Events</option>
                <option value="Seminar">Seminar</option>
                <option value="Workshop">Workshop</option>
                <option value="Cultural">Cultural</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <ChevronLeft className="-rotate-90" size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#1E293B] rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#020617]/50 text-slate-500 uppercase text-[10px] font-black tracking-widest border-b border-slate-700">
                  <th className="px-6 py-4">Details</th>
                  <th className="px-6 py-4">Organizer</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {events.map((event) => (
                  <tr
                    key={event._id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-700">
                          <Image
                            width={50}
                            height={50}
                            src={event.image || "/placeholder.png"}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex flex-col max-w-62.5">
                          <span className="font-bold text-slate-100 truncate">
                            {event.title}
                          </span>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Tag size={10} /> {event.eventType}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-[11px]">
                        <span className="text-slate-300 font-semibold">
                          {event.organizer}
                        </span>
                        <span className="text-slate-500 flex items-center gap-1">
                          <MapPin size={10} /> {event.location}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs text-slate-300">
                          <Calendar size={14} />
                          {event.date}
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Clock size={10} />
                          {event.startTime} - {event.endTime}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={getStatusBadge(event.status)}>
                        {event.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-600 hover:text-white hover:bg-slate-700 rounded-lg">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-[#020617]/30 border-t border-slate-800 flex items-center justify-between">
            <p className="text-[11px] text-slate-500 italic">
              * Live update from database
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="p-2 text-slate-500 hover:text-white disabled:opacity-30"
              >
                <ChevronLeft size={20} />
              </button>

              <span className="text-sm font-bold text-blue-500 px-2">
                {page}
              </span>

              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="p-2 text-slate-500 hover:text-white"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
