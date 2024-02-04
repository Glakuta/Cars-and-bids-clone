import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../features/userSlice";
import { User } from "../../utils/types/userTypes";

const BASE_URL = "http://localhost:3500";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/users/`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query<User, null>({
      query() {
        return {
          url: "me",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: { user: User } }) => result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
