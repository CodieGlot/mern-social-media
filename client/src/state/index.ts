import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaletteMode } from "@mui/material";
import { IAuthTokenPayload, IBlogPost, IUser } from "../interfaces";

interface StateInterface {
  themeMode: PaletteMode;
  user: IUser | null;
  authTokenPayload: IAuthTokenPayload | null;
  posts: [IBlogPost] | [];
}

const initialState: StateInterface = {
  themeMode: "light",
  user: null,
  authTokenPayload: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.themeMode = state.themeMode === "light" ? "dark" : "light";
    },
    setLogin: (
      state,
      action: PayloadAction<{
        user: IUser;
        authTokenPayload: IAuthTokenPayload;
      }>
    ) => {
      state.user = action.payload.user;
      state.authTokenPayload = action.payload.authTokenPayload;
    },
    setLogout: (state) => {
      state.user = null;
      state.authTokenPayload = null;
    },
    setFriends: (
      state,
      action: PayloadAction<{
        friendList: Array<{ userId: string; username: string }>;
      }>
    ) => {
      if (state.user) {
        state.user.friendList = action.payload.friendList;
      } else {
        console.error("No friends to set");
      }
    },
    setPosts: (state, action: PayloadAction<{ posts: [IBlogPost] }>) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action: PayloadAction<{ post: IBlogPost }>) => {
      state.posts.some((post: IBlogPost, index: number) => {
        if (post._id === action.payload.post._id) {
          state.posts[index] = action.payload.post;
          return true;
        }
        return false;
      });
      //state.posts = posts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
