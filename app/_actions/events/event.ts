"use server";

export async function getAllEvents({
  search,
  status,
  sort,
  page = "1",
  limit = "6",
}: {
  search?: string;
  status?: string;
  sort?: string;
  page?: string;
  limit?: string;
}) {
  try {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (status) params.append("status", status);
    if (sort) params.append("sort", sort);
    params.append("page", page);
    params.append("limit", limit);

    const response = await fetch(
      `http://localhost:8080/api/v1/events?${params.toString()}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    return { data: [] };
  }
}

export const getEventById = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/events/${id}`, {
      cache: "no-store",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Error fetching event by ID:", error);
    return { data: null };
  }
};
