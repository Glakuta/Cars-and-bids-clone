import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../utils/types/userTypes";
import { AuthState } from "../../utils/types/userTypes";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    token: null,
    error: null,
    success: false,
    loading: true,
  } as AuthState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
    setCredentials: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {
        payload: { user, token },
      }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
      PayloadAction<{ user: User | null; token: string | null }>
    ) => {
      state.user = user;
      state.token = token;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logOut,
  setCredentials,
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: { user: User } }) =>
  state.auth.user;
export const selectCurrentToken = (state: { auth: { token: User } }) =>
  state.auth.token;
