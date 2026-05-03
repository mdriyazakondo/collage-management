"use server";

export async function getAllBlogs({
  search,
  blog_type,
  sort,
  page = "1",
  limit = "6",
}: {
  search?: string;
  blog_type?: string;
  sort?: string;
  page?: string;
  limit?: string;
} = {}) {
  try {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (blog_type) params.append("blog_type", blog_type);
    if (sort) params.append("sort", sort);
    params.append("page", page);
    params.append("limit", limit);

    const response = await fetch(
      `http://localhost:8080/api/v1/blog?${params.toString()}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    return { data: [] };
  }
}
