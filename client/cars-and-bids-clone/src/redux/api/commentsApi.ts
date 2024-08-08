import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Comment, Comments } from "../../utils/types/commentType";
import Cookies from "js-cookie";

export const commentApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500",
    prepareHeaders: (headers) => {
      const token = Cookies.get("jwt");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllComments: builder.query<Comments, void>({
      query: () => ({
        url: `api/v1/65d26549ff92afdda4cbdb21/comments`,
        method: "GET",
      }),
      transformResponse: (result: Comments) => {
        console.log(result);
        return result;
      },
    }),
    getComment: builder.query<Comment, { carId: string; commentId: string }>({
      query: ({ carId, commentId }) => ({
        url: `api/v1/${carId}/comments/${commentId}`,
        method: "GET",
      }),
    }),
    addComment: builder.mutation<Comment, Comment>({
      query: (comment) => ({
        url: "api/v1//comments",
        method: "POST",
        body: comment,
        credentials: "include",
      }),
    }),
    updateComment: builder.mutation<
      Comment,
      { carId: string; comment: Comment }
    >({
      query: ({ carId, comment }) => ({
        url: `api/v1/${carId}/comments/${comment._id}`,
        method: "PUT",
        body: comment,
        credentials: "include",
      }),
    }),
    deleteComment: builder.mutation<
      Comment,
      { carId: string; comment: Comment }
    >({
      query: ({ carId, comment }) => ({
        url: `api/v1/${carId}/comments/${comment._id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllCommentsQuery,
  useGetCommentQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
