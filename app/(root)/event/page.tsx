import React from "react";
import EventCart from "./_components/EventCart";
import { getAllEvents } from "@/app/_actions/events/event";
import { TEvents } from "@/types/event";
import { Metadata } from "next";
import Pagination from "@/components/Pagination";

export const metadata: Metadata = {
  title: "Events | College Management System",
  description:
    "Discover all the exciting events happening in our college community.",
  keywords: [
    "college",
    "events",
    "campus",
    "activities",
    "upcoming",
    "completed",
  ],
  openGraph: {
    title: "Events | College Management System",
    description:
      "Discover all the exciting events happening in our college community.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Events | College Management System",
    description:
      "Discover all the exciting events happening in our college community.",
  },
};

type EventsPageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }>;
};

const Events = async ({ searchParams }: EventsPageProps) => {
  const params = await searchParams;
  // 🔥 Backend call with query params
  const result = await getAllEvents({
    search: params.search,
    status: params.status,
    sort: params.sort,
    page: params.page || "1",
    limit: params.limit || "6",
  });
  console.log(result);
  const events = result?.data || [];
  const meta = result?.meta || { total: 0, page: 1, limit: 6, totalPages: 0 };

  // 📭 Empty State
  if (!events || events.length === 0) {
    return (
      <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-gray-400 text-lg">No matching events found.</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-14 px-6">
      <div className="max-w-7xl mx-auto">
        {/* 🔹 Title */}
        <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4">
          Events
        </h2>
        {/* 🔹 Search / Filter / Sort UI */}
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <input
            type="text"
            name="search"
            placeholder="Search events..."
            defaultValue={params.search}
            className="px-4 py-2 rounded bg-[#111] text-white border border-gray-700"
          />

          <select
            name="status"
            defaultValue={params.status}
            className="px-4 py-2 rounded bg-[#111] text-white border border-gray-700"
          >
            <option value="">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            name="sort"
            defaultValue={params.sort}
            className="px-4 py-2 rounded bg-[#111] text-white border border-gray-700"
          >
            <option value="">Sort By</option>
            <option value="date-asc">Date ↑</option>
            <option value="date-desc">Date ↓</option>
            <option value="title">Title (A–Z)</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
          >
            Apply
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events?.map((event: TEvents) => (
            <EventCart key={event._id} event={event} />
          ))}
        </div>

        {/* 🔹 Pagination */}
        <Pagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
          baseUrl="/event"
          searchParams={{
            search: params.search || "",
            status: params.status || "",
            sort: params.sort || "",
            limit: params.limit || "6",
          }}
        />
      </div>
    </section>
  );
};

export default Events;
