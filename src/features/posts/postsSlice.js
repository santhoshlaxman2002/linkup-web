import { createSlice } from "@reduxjs/toolkit";
import { createPostThunk, getPostsThunk, deletePostThunk } from "./postsThunks";

const initialState = {
  posts: [],
  loading: false,
  createPostLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Post
      .addCase(createPostThunk.pending, (state) => {
        state.createPostLoading = true;
        state.error = null;
      })
      .addCase(createPostThunk.fulfilled, (state, action) => {
        state.createPostLoading = false;
        state.posts.unshift(action.payload); // Add new post to the beginning
      })
      .addCase(createPostThunk.rejected, (state, action) => {
        state.createPostLoading = false;
        state.error = action.payload;
      })
      // Get Posts
      .addCase(getPostsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPostsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Post
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePostThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = postsSlice.actions;
export default postsSlice.reducer;
