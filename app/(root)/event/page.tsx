"use client";

import React from "react";
import { useGetAllEventsQuery } from "@/redux/service/event/eventApi";
import EventCart from "./_components/EventCart";

const Events = () => {
  const {
    data: response,
    isLoading,
    error,
  } = useGetAllEventsQuery("?page=1&limit=6");
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        Loading events...
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
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-10 border-l-4 border-blue-500 pl-4">
          Upcoming Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {response?.data.map((event) => (
            <EventCart key={event._id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
