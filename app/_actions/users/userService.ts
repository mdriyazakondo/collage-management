"use server";

export async function getAllUsers() {
  try {
    const response = await fetch("http://localhost:8080/api/v1/user/all_user", {
      cache: "no-store", // Fresh data pawar jonno
    });

    if (!response.ok) return null;

    const result = await response.json();
    return result.data; // Apnar API structure onujayi result pathan
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
}
