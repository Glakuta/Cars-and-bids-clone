import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment, Comments } from "../../utils/types/commentType";

const allCommentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    error: null,
    success: false,
    loading: true,
  } as Comments,
  reducers: {
    getAllCommentsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllCommentsSuccess: (state, action: PayloadAction<Comment[]>) => {
      state.loading = false;
      state.comments = action.payload;
      state.error = null;
    },
    getAllCommentsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getSingleCommentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSingleCommentSuccess: (state, action: PayloadAction<Comment>) => {
      state.loading = false;
      state.comments = [action.payload];
      state.error = null;
    },
    getSingleCommentFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addCommentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addCommentSuccess: (state, action: PayloadAction<Comment>) => {
      state.loading = false;
      state.comments.push(action.payload);
      state.error = null;
    },
    addCommentFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCommentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateCommentSuccess: (state, action: PayloadAction<Comment>) => {
      state.loading = false;
      state.comments = state.comments.map((comment) =>
        comment._id === action.payload._id ? action.payload : comment
      );
      state.error = null;
    },
    updateCommentFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteCommentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteCommentSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload
      );
      state.error = null;
    },
    deleteCommentFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAllCommentsStart,
  getAllCommentsSuccess,
  getAllCommentsFailure,
} = allCommentsSlice.actions;

export default allCommentsSlice.reducer;
