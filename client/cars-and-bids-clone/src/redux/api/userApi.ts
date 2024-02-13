import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../features/userSlice";
import { User } from "../../utils/types/userTypes";
//import { useCookies } from "react-cookie";

const BASE_URL = "http://localhost:3500";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1/users`,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    prepareHeaders: (headers, { getState }) => {
      const [cookies] = cookie;
      const token = cookies.jwt;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query<User, null>({
      query(userId) {
        return {
          url: `/${userId}`,
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
