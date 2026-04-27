export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  );

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();
    console.log("data", data);

    return data.secure_url; // এটিই আপনার ইমেজ লিঙ্ক
  } catch (error) {
    console.error("Cloudinary Error:", error);
    return null;
  }
};
