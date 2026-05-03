"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Tag,
  User,
  Image as ImageIcon,
  Info,
} from "lucide-react";
import { uploadToCloudinary } from "@/utils/upload";
import { useUpdateEventMutation } from "@/redux/service/event/eventApi";
import Swal from "sweetalert2";
import { TEvents } from "@/types/event";
import Image from "next/image";

type EventFormValues = {
  title: string;
  eventType: string;
  organizer: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  status: string;
  description: string;
  image?: FileList;
};

type Props = {
  onClose: () => void;
  event: TEvents;
};

const EditEventModal = ({ onClose, event }: Props) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    event.image || null,
  );

  const { register, handleSubmit, watch } = useForm<EventFormValues>({
    defaultValues: {
      title: event.title,
      eventType: event.eventType,
      organizer: event.organizer,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      status: event.status,
      description: event.description,
    },
  });

  const [updateEvent, { isLoading }] = useUpdateEventMutation();
  const selectedImage = watch("image");

  useEffect(() => {
    if (selectedImage && selectedImage.length > 0) {
      const url = URL.createObjectURL(selectedImage[0]);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [selectedImage]);

  const onSubmit = async (data: EventFormValues) => {
    try {
      let imageUrl = event.image;
      if (data.image && data.image.length > 0) {
        imageUrl = await uploadToCloudinary(data.image[0]);
      }

      const { image, ...rest } = data;
      await updateEvent({
        id: event._id,
        data: { ...rest, image: imageUrl },
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Event updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      onClose();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: error?.data?.message || "Update failed",
      });
    }
  };

  // কমন ইনপুট স্টাইল
  const inputClass =
    "w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-500";
  const labelClass =
    "text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-2";

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1E293B] w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden animate-in fade-in zoom-in duration-200"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-slate-800/50 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <Calendar size={20} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Edit Event
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 space-y-5 max-h-[80vh] overflow-y-auto custom-scrollbar"
        >
          {/* Image Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-900/30 p-4 rounded-xl border border-slate-700/50">
            <div className="relative group aspect-video rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
              {imagePreview ? (
                <Image
                  width={60}
                  height={50}
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500">
                  <ImageIcon size={40} />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className={labelClass}>
                <ImageIcon size={14} /> Event Cover
              </label>
              <input
                type="file"
                {...register("image")}
                className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600/10 file:text-blue-400 hover:file:bg-blue-600/20 cursor-pointer"
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <label className={labelClass}>
              <Info size={14} /> Event Title
            </label>
            <input
              {...register("title")}
              placeholder="Enter event title"
              className={inputClass}
            />
          </div>

          {/* Type & Organizer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className={labelClass}>
                <Tag size={14} /> Event Type
              </label>
              <input
                {...register("eventType")}
                placeholder="Webinar, Seminar, etc."
                className={inputClass}
              />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>
                <User size={14} /> Organizer
              </label>
              <input
                {...register("organizer")}
                placeholder="Company name"
                className={inputClass}
              />
            </div>
          </div>

          {/* Date & Time Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/20 p-4 rounded-xl">
            <div className="space-y-1">
              <label className={labelClass}>
                <Calendar size={14} /> Date
              </label>
              <input
                type="date"
                {...register("date")}
                className={inputClass + " [color-scheme:dark]"}
              />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>
                <Clock size={14} /> Start Time
              </label>
              <input
                type="time"
                {...register("startTime")}
                className={inputClass + " [color-scheme:dark]"}
              />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>
                <Clock size={14} /> End Time
              </label>
              <input
                type="time"
                {...register("endTime")}
                className={inputClass + " [color-scheme:dark]"}
              />
            </div>
          </div>

          {/* Location & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className={labelClass}>
                <MapPin size={14} /> Location
              </label>
              <input
                {...register("location")}
                placeholder="Dhaka, Bangladesh"
                className={inputClass}
              />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Status</label>
              <select {...register("status")} className={inputClass}>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className={labelClass}>Description</label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="Write event details..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-slate-300 hover:bg-slate-700 transition-all border border-slate-700"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="flex-[2] bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white py-2.5 rounded-lg font-bold shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Updating...
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
