import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../utils/types/userTypes";

interface IUserState {
  user: User | null;
}

const initialState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    logOut: (state) => {
      state.user = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { logOut, setUser } = userSlice.actions;
