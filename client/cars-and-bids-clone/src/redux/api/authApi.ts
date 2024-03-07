/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericResponse } from "../types";
import {
  LoginUserData,
  RegisterUserData,
  User,
} from "../../utils/types/userTypes";
import { userApi } from "./userApi";

//import { setCredentials, logOut } from "../../components/Auth/authSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {
        token: string;
        status: string;
        data: { user: User };
      },
      LoginUserData
    >({
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
          const options = [data.data.user._id, data.token];
          await dispatch(userApi.endpoints.getMe.initiate(options));
        } catch (error) {
          return console.log(error);
        }
      },
    }),
    registerUser: builder.mutation<
      { accessToken: string; status: string; user: User },
      RegisterUserData
    >({
      query: (data: {
        username: string;
        email: string;
        password: string;
        passwordConfirm: string;
      }) => {
        return {
          url: "api/v1/users/signin",
          method: "POST",
          body: data,
          //credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(data.user._id));
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
