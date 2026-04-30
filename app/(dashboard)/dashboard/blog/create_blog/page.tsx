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
import Swal from "sweetalert2";

import { useCreateBlogMutation } from "@/redux/service/blog/blogApi";
import { uploadToCloudinary } from "@/utils/upload";

export interface TBlog {
  author: string;
  title: string;
  description: string;
  blog_type: string;
}

const BlogForm = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [createBlog] = useCreateBlogMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TBlog>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const onSubmit: SubmitHandler<TBlog> = async (data) => {
    try {
      let uploadedImages: string[] = [];

      if (selectedFiles.length > 0) {
        uploadedImages = await Promise.all(
          selectedFiles.map(async (file) => {
            const res = await uploadToCloudinary(file);
            return res || "";
          }),
        );
      }

      const finalData = {
        ...data,
        image: uploadedImages,
      };
      console.log(finalData);
      const blogData = await createBlog(finalData).unwrap();
      console.log(blogData);

      Swal.fire({
        icon: "success",
        title: "Blog Created Successfully 🎉",
        text: "Your content has been published!",
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
      setSelectedFiles([]);
    } catch (err: any) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err?.data?.message || "Something went wrong!",
      });
    }
  };

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
                College Content Management
              </h2>
              <p className="text-blue-400 text-xs italic">
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
            {/* Author + Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-sm text-slate-300 flex items-center gap-2 mb-2">
                  <User size={16} />
                  Author
                </label>
                <input
                  {...register("author", { required: "Author is required" })}
                  className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-slate-700 text-white"
                  placeholder="Enter full name"
                />
                <p className="text-red-400 text-xs mt-1">
                  {errors.author?.message}
                </p>
              </div>

              <div>
                <label className="text-sm text-slate-300 flex items-center gap-2 mb-2">
                  <Tags size={16} />
                  Blog Type
                </label>
                <select
                  {...register("blog_type", {
                    required: "Category required",
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-slate-700 text-white"
                >
                  <option value="">Choose category</option>
                  <option value="notice">Notice</option>
                  <option value="event">Event</option>
                  <option value="research">Research</option>
                  <option value="newsletter">Newsletter</option>
                </select>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-sm text-slate-300 flex items-center gap-2 mb-2">
                <FileText size={16} />
                Title
              </label>
              <input
                {...register("title", { required: "Title required" })}
                className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-slate-700 text-white"
                placeholder="Blog title"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-slate-300 flex items-center gap-2 mb-2">
                <AlignLeft size={16} />
                Description
              </label>
              <textarea
                rows={6}
                {...register("description", {
                  required: "Description required",
                })}
                className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-slate-700 text-white"
                placeholder="Write content..."
              />
            </div>

            {/* Upload */}
            <div>
              <label className="text-sm text-slate-300 flex items-center gap-2 mb-2">
                <UploadCloud size={16} />
                Attachments
              </label>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={handleFileChange}
              />

              <div
                onClick={triggerUpload}
                className="border-2 border-dashed border-slate-700 rounded-xl p-8 cursor-pointer text-center hover:border-blue-500"
              >
                <UploadCloud className="mx-auto text-blue-500 mb-3" size={28} />
                <p className="text-slate-300 font-semibold">
                  Click to upload files
                </p>
              </div>

              <AnimatePresence>
                {selectedFiles.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {selectedFiles.map((file, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-between p-3 bg-[#0F172A] rounded-lg border border-slate-700"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FileIcon size={16} className="text-blue-500" />
                          <span className="text-xs text-slate-300 truncate">
                            {file.name}
                          </span>
                        </div>

                        <button type="button" onClick={() => removeFile(index)}>
                          <X size={14} className="text-red-400" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-slate-700">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setSelectedFiles([]);
                }}
                className="px-6 py-3 text-slate-400 hover:text-white"
              >
                Clear
              </button>

              <button
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 rounded-lg text-white flex items-center gap-2"
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
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogForm;
