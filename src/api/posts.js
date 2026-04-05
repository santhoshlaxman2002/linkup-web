import axiosInstance from "../utils/axiosInstance";

// Create a new post
export const createPost = async (postData) => {
  try {
    const res = await axiosInstance.post("/posts", postData);
    return res.data;
  } catch (error) {
    console.error("Create post failed:", error);
    throw error;
  }
};

// Get posts feed
export const getPosts = async () => {
  try {
    const res = await axiosInstance.get("/posts");
    return res.data;
  } catch (error) {
    console.error("Get posts failed:", error);
    throw error;
  }
};

// Delete a post
export const deletePost = async (postId) => {
  try {
    const res = await axiosInstance.delete(`/posts/${postId}`);
    return res.data;
  } catch (error) {
    console.error("Delete post failed:", error);
    throw error;
  }
};
