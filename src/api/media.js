import axiosInstance from "../utils/axiosInstance";

// Upload image to server
export const uploadMedia = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosInstance.post("/media/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};
