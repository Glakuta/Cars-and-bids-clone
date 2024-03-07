import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Car, Cars } from "../../utils/types/carsType";

const allCarsSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    error: null,
    success: false,
    loading: true,
  } as Cars,
  reducers: {
    getCarsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCarsSuccess: (state, action: PayloadAction<Car[]>) => {
      state.loading = false;
      state.cars = action.payload;
      state.error = null;
    },
    getCarsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getCarsStart, getCarsSuccess, getCarsFailure } =
  allCarsSlice.actions;

export default allCarsSlice.reducer;
