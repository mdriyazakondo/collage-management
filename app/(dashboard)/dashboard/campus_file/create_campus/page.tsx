"use client";

import React, { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  FileText,
  CheckCircle,
  Loader2,
  Image as ImageIcon,
  GraduationCap,
  Upload,
  X,
  Plus,
  Video,
} from "lucide-react";
import Image from "next/image";

export interface TCampus {
  title: string;
  description: string;
  photos?: FileList;
  videos?: string;
  date: string;
  location: string;
}

const CampusForm = () => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<TCampus>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === files.length) {
            setImagePreviews(newPreviews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImages = () => {
    setImagePreviews([]);
    setValue("photos", undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit: SubmitHandler<TCampus> = async (data) => {
    console.log("Campus Data:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    reset();
    setImagePreviews([]);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-[#1E293B] rounded-xl shadow-2xl border border-slate-700 overflow-hidden"
      >
        {/* Top Professional Header */}
        <div className="bg-[#020617] px-8 py-6 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <GraduationCap size={28} />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                Campus Life Management
              </h2>
              <p className="text-blue-400 text-xs mt-0.5 font-medium italic">
                Highlight events, milestones, and activities
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <Calendar size={14} />
            <span>
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Multi-Image Upload Section */}
            <div className="space-y-3">
              <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <ImageIcon size={16} className="text-blue-500" />
                Campus Photos
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative group cursor-pointer border-2 border-dashed rounded-xl transition-all duration-300 min-h-50 flex flex-col items-center justify-center overflow-hidden
                ${imagePreviews.length > 0 ? "border-blue-500/50 bg-[#0F172A]" : "border-slate-700 bg-[#0F172A]/50 hover:border-blue-500/50 hover:bg-[#0F172A]"}`}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  {...register("photos")}
                  ref={(e) => {
                    register("photos").ref(e);
                    fileInputRef.current = e;
                  }}
                  onChange={(e) => {
                    register("photos").onChange(e);
                    handleImageChange(e);
                  }}
                />

                <AnimatePresence mode="wait">
                  {imagePreviews.length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full p-4 grid grid-cols-2 md:grid-cols-4 gap-3"
                    >
                      {imagePreviews.map((src, idx) => (
                        <div
                          key={idx}
                          className="aspect-video rounded-lg overflow-hidden border border-slate-700 relative group/item"
                        >
                          <Image
                            width={500}
                            height={300}
                            src={src}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        </div>
                      ))}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                        <button
                          type="button"
                          className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                        >
                          <Upload size={20} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImages();
                          }}
                          className="p-2 bg-red-500/80 rounded-full text-white hover:bg-red-500 transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center p-6"
                    >
                      <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Plus size={32} className="text-blue-500" />
                      </div>
                      <p className="text-slate-300 font-semibold">
                        Click to upload campus highlights
                      </p>
                      <p className="text-slate-500 text-[10px] mt-1 uppercase tracking-widest font-black">
                        Select multiple images
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Date & Location Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Calendar size={16} className="text-blue-500" />
                  Event Date
                </label>
                <input
                  type="date"
                  {...register("date", { required: "Date is required" })}
                  className={`w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-100 color-scheme-dark
                  ${errors.date ? "border-red-500 ring-red-500/10" : ""}`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <MapPin size={16} className="text-blue-500" />
                  Location
                </label>
                <input
                  {...register("location", {
                    required: "Location is required",
                  })}
                  className={`w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-100 placeholder:text-slate-600
                  ${errors.location ? "border-red-500 ring-red-500/10" : ""}`}
                  placeholder="Main Auditorium, Ground, etc."
                />
              </div>
            </div>

            {/* Title Field */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <FileText size={16} className="text-blue-500" />
                Campus Post Title
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                className={`w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-100 text-lg font-semibold placeholder:text-slate-600
                ${errors.title ? "border-red-500 ring-red-500/10" : ""}`}
                placeholder="Ex: Annual Cultural Fest 2026"
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <AlignLeft size={16} className="text-blue-500" />
                Detailed Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                rows={5}
                className={`w-full px-4 py-4 rounded-lg bg-[#0F172A] border border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-200 resize-none leading-relaxed placeholder:text-slate-600
                ${errors.description ? "border-red-500 ring-red-500/10" : ""}`}
                placeholder="Describe the campus activity in detail..."
              />
            </div>

            {/* Videos Input */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Video size={16} className="text-blue-500" />
                Video URLs
              </label>
              <input
                {...register("videos")}
                className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-100 placeholder:text-slate-600"
                placeholder="youtube.com/link1, vimeo.com/link2"
              />
              <p className="text-[10px] text-slate-500 font-bold italic tracking-wider">
                Separate multiple URLs with commas
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-700/50">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setImagePreviews([]);
                }}
                className="px-6 py-3 rounded-lg text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              >
                Reset Form
              </button>
              <motion.button
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm shadow-xl shadow-blue-900/20 transition-all flex items-center gap-2 disabled:bg-slate-700 disabled:text-slate-500 disabled:shadow-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} className="text-white" />
                    Submit Highlight
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>

        {/* Footer info */}
        <div className="px-8 py-4 bg-[#020617] border-t border-slate-800 text-center">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[3px]">
            College Management System — Campus Activity Portal
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const AlignLeft = ({
  size,
  className,
}: {
  size: number;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 6H3" />
    <path d="M15 12H3" />
    <path d="M17 18H3" />
  </svg>
);

export default CampusForm;
