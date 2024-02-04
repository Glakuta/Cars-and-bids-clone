import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    userState: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([authApi.middleware]),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
