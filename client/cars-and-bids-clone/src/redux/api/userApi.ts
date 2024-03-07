/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../features/authSlice";
import { User } from "../../utils/types/userTypes";
import Cookies from "js-cookie";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3500/api/v1/users/`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("jwt");
      console.log(token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),

  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query<User, string[]>({
      query([id, token]) {
        return {
          url: `${id}`,
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      transformResponse: (result: { data: { user: User } }) => result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          console.log("Udało się!!!");
        } catch (error) {
          return console.log(error);
        }
      },
    }),
  }),
});
