import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      
    },
  },
  setLogin: (state, action) => {
    state.user = action.payload.user;
    state.token = action.payload.token;
  },
  setLogout: (state) => {
    state.user = null;
    state.token = null;
  },
  setFriends: (state, action) => {
    if (state.user) {
      state.user.friends = action.payload.friends;
    } else {
      console.error("user friends non-existent :(");
    }
  },
  setPosts: (state, action) => {
    state.posts = action.payload.posts;
  },
  setPost: (state, action) => {
    const updatedPosts = state.posts.map((post) => {
      if (post._id === action.payload.post._id) return action.payload.post;
      return post;
    });
    state.posts = updatedPosts;
  },
},
);

export const { setMode, setLogin , setLogout, setFriends } = globalSlice.actions;

export default globalSlice.reducer;