"use client";

import React, { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  FileText,
  Tag,
  CheckCircle,
  Loader2,
  Image as ImageIcon,
  GraduationCap,
  X,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { uploadToCloudinary } from "@/utils/upload";
import Swal from "sweetalert2";
import { useCreateEventMutation } from "@/redux/service/event/eventApi";
import { TEventFormValues } from "@/types/event";

const EventForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<TEventFormValues>({
    defaultValues: {
      status: "upcoming",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue("image", undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit: SubmitHandler<TEventFormValues> = async (data) => {
    try {
      let imageUrl = "";

      if (data.image && data.image.length > 0) {
        const file = data.image[0];
        const res = await uploadToCloudinary(file);
        imageUrl = res || "";
      }

      const { image, ...restData } = data;

      const finalData = {
        ...restData,
        image: imageUrl,
      };

      const eventData = await createEvent(finalData).unwrap();
      console.log(eventData, "event data");

      Swal.fire({
        icon: "success",
        title: "Event Created Successfully 🎉",
        text: "Your event has been created!",
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
      setImagePreview(null);
    } catch (err: any) {
      console.error("FAILED:", err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err?.data?.message || "Something went wrong!",
      });
    }
  };

  // সাবমিট বা লোডিং অবস্থা চেক করা
  const isPending = isSubmitting || isCreating;

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-[#1E293B] rounded-xl shadow-2xl border border-slate-700 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#020617] px-8 py-6 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <GraduationCap size={28} />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                Campus Event Planner
              </h2>
              <p className="text-blue-400 text-xs mt-0.5 font-medium italic">
                Schedule workshops, seminars, and college fests
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Image Upload Section */}
            <div className="space-y-3">
              <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <ImageIcon size={16} className="text-blue-500" />
                Event Cover Image
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative group cursor-pointer border-2 border-dashed rounded-xl transition-all duration-300 min-h-[200px] flex flex-col items-center justify-center overflow-hidden
                ${imagePreview ? "border-blue-500/50 bg-[#0F172A]" : "border-slate-700 bg-[#0F172A]/50 hover:border-blue-500/50 hover:bg-[#0F172A]"}`}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("image")}
                  onChange={(e) => {
                    register("image").onChange(e); 
                    handleImageChange(e); 
                  }}
                  ref={(e) => {
                    register("image").ref(e);
                    fileInputRef.current = e;
                  }}
                />

                <AnimatePresence mode="wait">
                  {imagePreview ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        fill
                        src={imagePreview}
                        alt="Preview"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage();
                          }}
                          className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
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
                      <Plus size={32} className="text-blue-500 mx-auto mb-2" />
                      <p className="text-slate-300 font-semibold">
                        Upload Banner
                      </p>
                      <p className="text-slate-500 text-xs mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <FileText size={16} className="text-blue-500" /> Event Title
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                className={`w-full px-4 py-3 rounded-lg bg-[#0F172A] border ${errors.title ? "border-red-500" : "border-slate-700"} text-slate-100 outline-none focus:border-blue-500 transition-colors`}
                placeholder="E.g. Tech Conference 2026"
              />
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Type */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Tag size={16} className="text-blue-500" /> Event Type
                </label>
                <input
                  {...register("eventType", { required: "Type is required" })}
                  className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-slate-700 text-slate-100 outline-none focus:border-blue-500"
                  placeholder="Workshop, Seminar, etc."
                />
              </div>
              {/* Organizer */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <User size={16} className="text-blue-500" /> Organizer
                </label>
                <input
                  {...register("organizer", {
                    required: "Organizer is required",
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-slate-700 text-slate-100 outline-none focus:border-blue-500"
                  placeholder="Department Name"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Type */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Tag size={16} className="text-blue-500" /> Start Time
                </label>
                <input
                  {...register("startTime", {
                    required: "Start time is required",
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-slate-700 text-slate-100 outline-none focus:border-blue-500"
                  placeholder="Event Start time."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Tag size={16} className="text-blue-500" /> End Time
                </label>
                <input
                  {...register("endTime", {
                    required: "End time is required",
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-slate-700 text-slate-100 outline-none focus:border-blue-500"
                  placeholder="Event End time"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Date */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Calendar size={16} className="text-blue-500" /> Date
                </label>
                <input
                  type="date"
                  {...register("date", { required: "Date is required" })}
                  className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-slate-700 text-slate-100 outline-none focus:border-blue-500"
                />
              </div>
              {/* Status */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle size={16} className="text-blue-500" /> Status
                </label>
                <select
                  {...register("status")}
                  className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-slate-700 text-slate-100 outline-none focus:border-blue-500"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <MapPin size={16} className="text-blue-500" /> Location
              </label>
              <input
                {...register("location", { required: "Location is required" })}
                className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-slate-700 text-slate-100 outline-none focus:border-blue-500"
                placeholder="Room No, Building or Online Link"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <FileText size={16} className="text-blue-500" /> Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-slate-700 text-slate-100 outline-none resize-none focus:border-blue-500"
                placeholder="Details about the event..."
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-700/50">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setImagePreview(null);
                }}
                className="px-6 py-3 text-sm font-bold text-slate-400 hover:text-white transition-all disabled:opacity-50"
                disabled={isPending}
              >
                Reset
              </button>
              <motion.button
                type="submit"
                disabled={isPending}
                whileHover={{ scale: isPending ? 1 : 1.02 }}
                whileTap={{ scale: isPending ? 1 : 0.98 }}
                className="px-10 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm shadow-xl flex items-center gap-2 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors"
              >
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} />
                    Create Event
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default EventForm;
