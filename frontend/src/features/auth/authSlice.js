import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, userId: null, roles: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, id, roles, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      state.userId = id;
      state.roles = roles;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
      state.userId = null;
      state.roles = null;
    },
  },
});
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUserId = (state) => state.auth.userId;
export const selectCurrentRoles = (state) => state.auth.roles;
