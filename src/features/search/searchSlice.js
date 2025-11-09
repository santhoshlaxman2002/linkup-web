// searchSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { searchUsersThunk, fetchRecentSearchesThunk, clearRecentSearchThunk, clearAllRecentSearchesThunk } from "./searchThunks";
const initialState = {
  users: [],
  recentSearches: [],
  loading: false,
  recentLoading: false,
  error: null,
  hasMore: true,
  recentHasMore: true,
  query: "",         // store current query
  offset: 0,
  recentOffset: 0,
  limit: 20,         // default limit
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetSearch: (state) => {
      state.users = [];
      state.offset = 0;
    //   state.query = "";
      state.hasMore = true;
      state.error = null;
    },
    setSearchQuery: (state, action) => {
      state.query = action.payload;
      console.log(state.query);
      
    },
    resetRecentSearches: (state) => {
      state.recentSearches = [];
      state.recentOffset = 0;
      state.recentHasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUsersThunk.fulfilled, (state, action) => {
        state.loading = false;

        const { users: fetchedUsers, offset: fetchedOffset, hasMore } = action.payload;
        const limit = state.limit;

        // if it's a new search (offset = 0) → replace
        if (fetchedOffset === 0) {
          state.users = fetchedUsers;
        } else {
          // append
          state.users = [...state.users, ...fetchedUsers];
        }

        state.offset = fetchedOffset + fetchedUsers.length;
        state.hasMore = hasMore;

        // (optional) update limit if you pass it via payload
        // state.limit = action.payload.limit || state.limit;
      })
      .addCase(searchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch users";
      })
            .addCase(fetchRecentSearchesThunk.pending, (state) => {
        state.recentLoading = true;
        state.error = null;
      })
      .addCase(fetchRecentSearchesThunk.fulfilled, (state, action) => {
        state.recentLoading = false;
        const { recentSearches, offset, hasMore } = action.payload;
        if (offset === 0) {
          state.recentSearches = recentSearches;
        } else {
          state.recentSearches = [...state.recentSearches, ...recentSearches];
        }
        state.recentOffset = offset + recentSearches.length;
        state.recentHasMore = hasMore;
      })
      .addCase(fetchRecentSearchesThunk.rejected, (state, action) => {
        state.recentLoading = false;
        state.error = action.payload || "Failed to fetch recent searches";
      })
      .addCase(clearRecentSearchThunk.fulfilled, (state, action) => {
        const removedId = action.payload;
        state.recentSearches = state.recentSearches.filter(item => item.id !== removedId);
      })
      .addCase(clearAllRecentSearchesThunk.fulfilled, (state) => {
        state.recentSearches = [];
        state.recentOffset = 0;
        state.recentHasMore = false;
      });
  },
});

export const { resetSearch, setSearchQuery, resetRecentSearches } = searchSlice.actions;
export default searchSlice.reducer;
