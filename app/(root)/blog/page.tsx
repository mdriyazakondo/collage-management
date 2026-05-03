import React from "react";
import { getAllBlogs } from "@/app/_actions/blog/blog";
import { TBlog } from "@/types/blog";
import { Metadata } from "next";
import BlogCart from "./_components/BlogCart";
import Pagination from "@/components/Pagination";

export const metadata: Metadata = {
  title: "Blogs | College Management System",
  description: "Discover all the blogs in our college community.",
  keywords: ["college", "blogs", "education", "campus", "news", "articles"],
  openGraph: {
    title: "Blogs | College Management System",
    description: "Discover all the blogs in our college community.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | College Management System",
    description: "Discover all the blogs in our college community.",
  },
};

type BlogsPageProps = {
  searchParams: Promise<{
    search?: string;
    blog_type?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }>;
};

const Blogs = async ({ searchParams }: BlogsPageProps) => {
  const params = await searchParams;
  const result = await getAllBlogs({
    search: params.search,
    blog_type: params.blog_type,
    sort: params.sort,
    page: params.page || "1",
    limit: params.limit || "6",
  });

  const blogs = result?.data || [];
  const meta = result?.meta || { total: 0, page: 1, limit: 6, totalPages: 0 };

  // 📭 Empty State
  if (!blogs || blogs.length === 0) {
    return (
      <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-gray-400 text-lg">No matching blogs found.</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-14 px-6">
      <div className="max-w-7xl mx-auto">
        {/* 🔹 Title */}
        <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4">
          Blogs
        </h2>

        {/* 🔹 Search / Filter / Sort UI */}
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <input
            type="text"
            name="search"
            placeholder="Search blogs..."
            defaultValue={params.search}
            className="px-4 py-2 rounded bg-[#111] text-white border border-gray-700"
          />

          <select
            name="blog_type"
            defaultValue={params.blog_type}
            className="px-4 py-2 rounded bg-[#111] text-white border border-gray-700"
          >
            <option value="">All Types</option>
            <option value="news">News</option>
            <option value="article">Article</option>
            <option value="tutorial">Tutorial</option>
          </select>

          <select
            name="sort"
            defaultValue={params.sort}
            className="px-4 py-2 rounded bg-[#111] text-white border border-gray-700"
          >
            <option value="">Sort By</option>
            <option value="title">Title (A–Z)</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
          >
            Apply
          </button>
        </form>

        {/* 🔹 Blogs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.data?.map((blog: TBlog) => (
            <BlogCart key={blog._id} blog={blog} />
          ))}
        </div>

        {/* 🔹 Pagination */}
        <Pagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
          baseUrl="/blog"
          searchParams={{
            search: params.search || "",
            blog_type: params.blog_type || "",
            sort: params.sort || "",
            limit: params.limit || "6",
          }}
        />
      </div>
    </section>
  );
};

export default Blogs;
