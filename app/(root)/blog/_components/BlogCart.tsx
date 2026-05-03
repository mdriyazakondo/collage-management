import React from "react";
import { TBlog } from "@/types/blog";
import Image from "next/image";

type BlogCartProps = {
  blog: TBlog;
};

const BlogCart = ({ blog }: BlogCartProps) => {
  return (
    <div className="bg-[#111] rounded-xl p-5 border border-gray-800 hover:border-blue-500 transition-all duration-300">
      {/* 🖼️ First Image */}
      {blog.image?.[0] && (
        <div className="mb-4">
          <Image
            src={blog.image[0]}
            alt={blog.title}
            width={500}
            height={300}
            className="rounded-lg object-cover w-full h-48"
          />
        </div>
      )}

      {/* 📝 Content */}
      <h3 className="text-xl font-semibold text-white mb-2">{blog.title}</h3>

      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
        {blog.description}
      </p>

      {/* 🏷️ Type */}
      <span className="inline-block text-xs px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full">
        {blog.blog_type}
      </span>
    </div>
  );
};

export default BlogCart;
