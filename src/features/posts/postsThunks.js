import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPost, getPosts, deletePost } from "../../api/posts";

// Create a new post
export const createPostThunk = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await createPost(postData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create post"
      );
    }
  }
);

// Get posts feed
export const getPostsThunk = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPosts();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch posts"
      );
    }
  }
);

// Delete a post
export const deletePostThunk = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      await deletePost(postId);
      return postId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete post"
      );
    }
  }
);
