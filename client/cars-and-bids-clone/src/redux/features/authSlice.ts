import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../utils/types/userTypes";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: {}, token: null, error: null, success: false },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      state.error = null;
      state.success = true;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logOut: (state, action) => {
      state.user = {};
      state.token = null;
      state.error = null;
      state.success = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const { setCredentials, logOut, setError } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: { user: User } }) =>
  state.auth.user;
export const selectCurrentToken = (state: { auth: { token: User } }) =>
  state.auth.token;
