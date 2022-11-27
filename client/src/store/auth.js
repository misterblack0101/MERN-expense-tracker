import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    getUser: (state, { payload }) => {
      state.isAuthenticated = true;
      state.user = payload;
    },
  },
});

export const { getUser } = authSlice.actions;

export default authSlice.reducer;
