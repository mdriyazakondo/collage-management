"use client";

import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  FileText,
  Tags,
  AlignLeft,
  UploadCloud,
  Loader2,
  CheckCircle,
  GraduationCap,
  Calendar,
  X,
  FileIcon,
} from "lucide-react";

export interface TBlog {
  author: string;
  title: string;
  description: string;
  blog_type: string;
  image?: string[];
}

const BlogForm = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TBlog>({
    defaultValues: {
      blog_type: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const onSubmit: SubmitHandler<TBlog> = async (data) => {
    console.log("Submitting Data:", data);
    console.log("Files to upload:", selectedFiles);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    reset();
    setSelectedFiles([]);
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
                College Content Management
              </h2>
              <p className="text-blue-400 text-xs mt-0.5 font-medium italic">
                Publish academic notices, articles, and campus updates
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
            {/* Primary Details Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Author Field */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <User size={16} className="text-blue-500" />
                  Administrator / Faculty Name
                </label>
                <input
                  {...register("author", {
                    required: "Author name is required",
                  })}
                  className={`w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-100 placeholder:text-slate-600
                  ${errors.author ? "border-red-500 ring-red-500/10" : ""}`}
                  placeholder="Enter full name"
                />
              </div>

              {/* Category Dropdown */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Tags size={16} className="text-blue-500" />
                  Publication Category
                </label>
                <select
                  {...register("blog_type", { required: "Select a category" })}
                  className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-100 cursor-pointer appearance-none"
                >
                  <option value="" className="bg-[#1E293B]">
                    Choose category
                  </option>
                  <option value="notice" className="bg-[#1E293B]">
                    Academic Notice
                  </option>
                  <option value="event" className="bg-[#1E293B]">
                    Campus Event
                  </option>
                  <option value="research" className="bg-[#1E293B]">
                    Research Paper
                  </option>
                  <option value="newsletter" className="bg-[#1E293B]">
                    College Newsletter
                  </option>
                </select>
              </div>
            </div>

            {/* Title Field */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <FileText size={16} className="text-blue-500" />
                Headline / Title
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-100 text-lg font-semibold placeholder:text-slate-600"
                placeholder="Ex: Annual Science Fair 2024 Schedule"
              />
            </div>

            {/* Content Field */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <AlignLeft size={16} className="text-blue-500" />
                Detailed Content
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                rows={6}
                className="w-full px-4 py-4 rounded-lg bg-[#0F172A] border border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-200 resize-none leading-relaxed placeholder:text-slate-600"
                placeholder="Write the full details here..."
              />
            </div>

            {/* Media Upload Box */}
            <div className="space-y-4">
              <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <UploadCloud size={16} className="text-blue-500" />
                Attachments
              </label>

              <input
                type="file"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.png,.jpg,.jpeg"
              />

              <div
                onClick={triggerUpload}
                className="border-2 border-dashed border-slate-700 rounded-xl p-8 hover:bg-[#0F172A] hover:border-blue-500/50 transition-all cursor-pointer group"
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                    <UploadCloud size={24} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-300">
                      Click to upload documents
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Select official documents or cover photos (PDF, PNG, JPG)
                    </p>
                  </div>
                </div>
              </div>

              {/* File Preview List */}
              <AnimatePresence>
                {selectedFiles.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {selectedFiles.map((file, index) => (
                      <motion.div
                        key={`${file.name}-${index}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-3 bg-[#0F172A] border border-slate-700 rounded-lg"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileIcon
                            size={18}
                            className="text-blue-500 flex-shrink-0"
                          />
                          <span className="text-xs font-medium text-slate-400 truncate">
                            {file.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(index);
                          }}
                          className="p-1 hover:bg-slate-800 rounded-full text-slate-500 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-700/50">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setSelectedFiles([]);
                }}
                className="px-6 py-3 rounded-lg text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              >
                Clear Draft
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
                    <CheckCircle size={18} />
                    Submit Post
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>

        {/* Footer info */}
        <div className="px-8 py-4 bg-[#020617] border-t border-slate-800 text-center">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[3px]">
            College Management System — Content Portal v2.0
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogForm;
