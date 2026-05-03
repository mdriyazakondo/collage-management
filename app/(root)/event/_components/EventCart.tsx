"use client";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { TEvents } from "@/types/event";
import Link from "next/link";
const EventCart = ({ event }: { event: TEvents }) => {
  return (
    <motion.div
      key={event._id}
      whileHover={{ y: -10 }}
      className="relative group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-colors duration-300"
    >
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          width={400}
          height={300}
          src={
            event.image ||
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000"
          }
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {event.eventType}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1 group-hover:text-yellow-400 transition-colors">
          {event.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-3">
          <div className="flex items-center text-gray-300 text-sm">
            <Calendar className="w-4 h-4 mr-2 text-yellow-500" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-gray-300 text-sm">
            <Clock className="w-4 h-4 mr-2 text-yellow-500" />
            <span>
              {event.startTime} - {event.endTime}
            </span>
          </div>
          <div className="flex items-center text-gray-300 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-yellow-500" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center text-gray-300 text-sm">
            <User className="w-4 h-4 mr-2 text-yellow-500" />
            <span className="truncate text-xs opacity-80">
              {event.organizer}
            </span>
          </div>
        </div>

        <div className="mt-12 w-full flex justify-center items-center ">
          <Link
            href={`/event/${event._id}`}
            className=" w-full py-3 flex justify-center items-center  bg-yellow-600 text-white rounded-xl font-medium transition-all duration-300 border border-white/5 hover:border-transparent"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCart;
