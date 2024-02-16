/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericResponse } from "../types";
import {
  AuthState,
  LoginUserData,
  RegisterUserData,
} from "../../utils/types/userTypes";
import { redirectDocument } from "react-router-dom";
import { setCredentials } from "../features/authSlice";
//import { setCredentials, logOut } from "../../components/Auth/authSlice";

export const authApi = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500",
    prepareHeaders: (headers) => {
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<AuthState, LoginUserData>({
      query: (data) => {
        return {
          url: "api/v1/users/login",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { user, token } = data;
          await dispatch(setCredentials({ user, token }));
        } catch (error) {
          return console.log(error);
        }
      },
    }),
    registerUser: builder.mutation<AuthState, RegisterUserData>({
      query: (body: {
        username: string;
        email: string;
        password: string;
        passwordConfirm: string;
      }) => {
        return {
          url: "api/v1/users/signin",
          method: "POST",
          body,
          //credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { user, token } = data;
          await dispatch(setCredentials({ user, token }));
        } catch (error) {
          return console.log(error);
        }
      },
    }),
    verifyEmail: builder.mutation<
      IGenericResponse,
      { verificationToken: string }
    >({
      query: ({ verificationToken }) => {
        return {
          url: `verifyemail/${verificationToken}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
