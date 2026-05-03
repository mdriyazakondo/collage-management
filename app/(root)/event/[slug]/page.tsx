import { getEventById } from "@/app/_actions/events/event";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Tag,
  ArrowLeft,
  Share2,
  ShieldCheck,
  Globe,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const response = await getEventById(slug);
  const event = response?.data;

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F1A] text-white font-sans">
        <div className="text-center animate-pulse">
          <h2 className="text-3xl font-bold mb-4 tracking-tight">
            Event Not Found
          </h2>
          <Link
            href="/event"
            className="text-blue-500 hover:text-blue-400 transition-all"
          >
            ← Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-slate-300 font-sans selection:bg-blue-500/30">
      {/* 1. Sticky Navigation Header */}
      <nav className="sticky top-0 z-50 bg-[#0B0F1A]/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/event"
            className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors"
          >
            <ArrowLeft size={18} /> Back to Events
          </Link>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/5 rounded-full transition-all">
              <Share2 size={18} />
            </button>
            <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-5 py-2 rounded-full font-semibold transition-all shadow-lg shadow-blue-600/20">
              Book Ticket
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Content (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Featured Image */}
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute top-4 left-4">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md border ${
                    event.status === "ongoing"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  }`}
                >
                  ● {event.status}
                </span>
              </div>
            </div>

            {/* Event Title & Metadata */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-1.5 text-xs font-medium bg-white/5 px-3 py-1 rounded-md border border-white/10">
                  <Tag size={14} className="text-blue-400" /> {event.eventType}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium bg-white/5 px-3 py-1 rounded-md border border-white/10">
                  <Globe size={14} className="text-purple-400" /> Public Event
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                {event.title}
              </h1>
            </div>

            {/* Description Card */}
            <div className="bg-white/2 border border-white/5 p-8 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <InfoIcon /> About This Event
              </h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                {event.description}
              </p>
            </div>
          </div>

          {/* Right Column: Information Card (4 Columns) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-[#151B28] border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full"></div>

                <h4 className="text-lg font-bold text-white mb-8 relative">
                  Event Schedule
                </h4>

                <div className="space-y-7 relative">
                  {/* Date Item */}
                  <div className="flex items-center gap-5">
                    <div className="h-12 w-12 shrink-0 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Calendar size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.15em] mb-0.5">
                        Date
                      </p>
                      <p className="text-white font-semibold text-sm">
                        {new Date(event.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Time Item */}
                  <div className="flex items-center gap-5">
                    <div className="h-12 w-12 shrink-0 bg-emerald-600/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                      <Clock size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.15em] mb-0.5">
                        Timeline
                      </p>
                      <p className="text-white font-semibold text-sm">
                        {event.startTime} - {event.endTime}
                      </p>
                    </div>
                  </div>

                  {/* Location Item */}
                  <div className="flex items-center gap-5">
                    <div className="h-12 w-12 shrink-0 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-400 border border-red-500/20">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.15em] mb-0.5">
                        Venue
                      </p>
                      <p className="text-white font-semibold text-sm">
                        {event.location}
                      </p>
                    </div>
                  </div>

                  {/* Organizer Item */}
                  <div className="flex items-center gap-5">
                    <div className="h-12 w-12 shrink-0 bg-purple-600/10 rounded-2xl flex items-center justify-center text-purple-400 border border-purple-500/20">
                      <User size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.15em] mb-0.5">
                        Organized By
                      </p>
                      <p className="text-white font-semibold text-sm">
                        {event.organizer}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-white/5 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    Verified Event by Admin
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-[0.97]">
                    Get Your Spot
                  </button>
                </div>
              </div>

              {/* Extra Small Card */}
              <div className="bg-white/5 border border-white/5 p-5 rounded-2xl text-center">
                <p className="text-xs text-slate-500">
                  Need help?{" "}
                  <Link href="/contact" className="text-blue-400">
                    Contact Support
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function InfoIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-500"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
