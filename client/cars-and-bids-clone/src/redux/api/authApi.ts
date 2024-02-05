/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericResponse } from "../types";
import { LoginUserData, RegisterUserData } from "../../utils/types/userTypes";
import { userApi } from "./userApi";
import { redirectDocument } from "react-router-dom";
//import { setCredentials, logOut } from "../../components/Auth/authSlice";

export const authApi = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      { access_token: string; status: string },
      LoginUserData
    >({
      query: (body: { email: string; password: string }) => {
        return {
          url: "api/v1/users/login",
          method: "POST",
          body,
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {
          return console.log(error);
        }
      },
    }),
    registerUser: builder.mutation<IGenericResponse, RegisterUserData>({
      query: (body: {
        username: string;
        email: string;
        password: string;
        passwordConfirm: string;
      }) => {
        return {
          url: "api/v1/users/signIn",
          method: "POST",
          body,
        };
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
