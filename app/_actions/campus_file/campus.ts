"use server";

export async function getAllCampus({
  search,
  sort,
  page = "1",
  limit = "6",
}: {
  search?: string;
  sort?: string;
  page?: string;
  limit?: string;
} = {}) {
  try {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (sort) params.append("sort", sort);
    params.append("page", page);
    params.append("limit", limit);

    const response = await fetch(
      `http://localhost:8080/api/v1/campus?${params.toString()}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch campus files");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Error fetching campus files:", error);
    return { data: [] };
  }
}
