"use client";

import {
  useDeleteEventMutation,
  useGetAllEventsQuery,
} from "@/redux/service/event/eventApi";
import { TEvents } from "@/types/event";
import {
  Search,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Tag,
  Calendar,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import EditEventModal from "../_components/EvemtUpdate";

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
  const [page] = useState(1);

  // ✅ MODAL STATES (ADDED)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<TEvents | null>(null);

  const limit = 10;

  const pathName = `?search=${searchTerm}&eventType=${selectedType}&page=${page}&limit=${limit}`;

  const { data, isLoading, error } = useGetAllEventsQuery(pathName);
  console.log("🚀 ~ file: page.tsx:35 ~ Page ~ data:", data);

  const events = data?.data || [];

  const [deleteEventMutation] = useDeleteEventMutation();

  const deleteEvent = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This event will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteEventMutation(id).unwrap();

      await Swal.fire({
        title: "Deleted!",
        text: "Event successfully deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire({
        title: "Failed!",
        text:
          error?.data?.message || "Event delete করা যায়নি, আবার চেষ্টা করুন।",
        icon: "error",
      });
    }
  };

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
        {/* HEADER */}
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
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                placeholder="Event খুঁজুন..."
                className="bg-[#1E293B] border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <select
                className="bg-[#1E293B] border border-slate-700 rounded-lg py-2 px-3 text-sm w-full sm:w-48"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">All Events</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-[#1E293B] rounded-xl border border-slate-700 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-xs border-b border-slate-700">
                <th className="p-4">Details</th>
                <th>Organizer</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {events?.map((event: TEvents) => (
                <tr
                  key={event._id}
                  className="border-b border-slate-800 hover:bg-slate-800/40"
                >
                  <td className="p-4 flex items-center gap-3">
                    <Image
                      src={event.image || "/placeholder.png"}
                      width={100}
                      height={80}
                      alt={event.title}
                      className="rounded"
                      loading="eager"
                    />
                    <div>
                      <p className="font-semibold">{event.title}</p>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <Tag size={12} /> {event.eventType}
                      </p>
                    </div>
                  </td>

                  <td>{event.organizer}</td>

                  <td className="text-sm text-slate-300">
                    <Calendar size={14} className="inline mr-1" />
                    {event.date}
                  </td>

                  <td>
                    <span className={getStatusBadge(event.status)}>
                      {event.status}
                    </span>
                  </td>

                  <td className="text-right p-4 space-x-3">
                    <button onClick={() => deleteEvent(event._id as string)}>
                      <FaTrash className="text-red-500" />
                    </button>

                    {/* ✅ FIXED EDIT BUTTON */}
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsOpen(true);
                      }}
                    >
                      <FaEdit className="text-blue-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ SINGLE MODAL (FIXED) */}
        {isOpen && selectedEvent && (
          <EditEventModal
            event={selectedEvent}
            onClose={() => {
              setIsOpen(false);
              setSelectedEvent(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
