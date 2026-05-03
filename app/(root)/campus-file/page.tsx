import React from "react";
import { getAllCampus } from "@/app/_actions/campus_file/campus";
import { TCampus } from "@/types/campus";
import { Metadata } from "next";
import Pagination from "@/components/Pagination";

export const metadata: Metadata = {
  title: "Campus Files | College Management System",
  description: "Discover all the campus files in our college community.",
  keywords: ["college", "files", "campus", "documents", "resources"],
  openGraph: {
    title: "Campus Files | College Management System",
    description: "Discover all the campus files in our college community.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Campus Files | College Management System",
    description: "Discover all the campus files in our college community.",
  },
};

type CampusPageProps = {
  searchParams: Promise<{
    search?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }>;
};

const CampusFile = async ({ searchParams }: CampusPageProps) => {
  const params = await searchParams;
  // 🔥 Backend call with query params
  const result = await getAllCampus({
    search: params.search,
    sort: params.sort,
    page: params.page || "1",
    limit: params.limit || "6",
  });

  const campusFiles = result?.data || [];
  const meta = result?.meta || { total: 0, page: 1, limit: 6, totalPages: 0 };

  // 📭 Empty State
  if (!campusFiles || campusFiles.length === 0) {
    return (
      <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-gray-400 text-lg">No matching campus files found.</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-14 px-6">
      <div className="max-w-7xl mx-auto">
        {/* 🔹 Title */}
        <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4">
          Campus Files
        </h2>

        {/* 🔹 Search / Filter / Sort UI */}
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <input
            type="text"
            name="search"
            placeholder="Search campus files..."
            defaultValue={params.search}
            className="px-4 py-2 rounded bg-[#111] text-white border border-gray-700"
          />

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

        {/* 🔹 Campus Files Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {campusFiles.map((file: TCampus) => (
            <div
              key={file._id}
              className="bg-[#111] rounded-lg p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {file.title}
              </h3>
              <p className="text-gray-400 mb-4">{file.description}</p>
              <p className="text-sm text-blue-400">Location: {file.location}</p>
              <p className="text-sm text-blue-400">Date: {file.date}</p>
            </div>
          ))}
        </div>

        {/* 🔹 Pagination */}
        <Pagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
          baseUrl="/campus-file"
          searchParams={{
            search: params.search || "",
            sort: params.sort || "",
            limit: params.limit || "6",
          }}
        />
      </div>
    </section>
  );
};

export default CampusFile;
