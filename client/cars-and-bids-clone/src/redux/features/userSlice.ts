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
    logout: () => initialState,
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { logout, setUser } = userSlice.actions;
