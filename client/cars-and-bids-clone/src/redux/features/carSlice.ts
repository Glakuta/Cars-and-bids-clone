import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Car, Cars } from "../../utils/types/carsType";
import { carsApi } from "../api/carsApi";

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
    getSingleCarStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSingleCarSuccess: (state, action: PayloadAction<Car>) => {
      state.loading = false;
      state.cars = [action.payload];
      state.error = null;
    },
    getSingleCarFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCarStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateCarSuccess: (state, action: PayloadAction<Car>) => {
      state.loading = false;
      state.cars = state.cars.map((car) =>
        car._id === action.payload._id ? action.payload : car
      );
      state.error = null;
    },
    updateCarFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteCarStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteCarSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.cars = state.cars.filter((car) => car._id !== action.payload);
      state.error = null;
    },
    deleteCarFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    sellCarStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    sellCarSuccess: (state, action: PayloadAction<Car>) => {
      state.loading = false;
      state.cars = state.cars.map((car) =>
        car._id === action.payload._id ? action.payload : car
      );
      state.error = null;
    },
    sellCarFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      carsApi.endpoints.getAllCars.matchFulfilled,
      (state, action) => {
        return action.payload;
      }
    );
  },
});

export const { getCarsStart, getCarsSuccess, getCarsFailure } =
  allCarsSlice.actions;

export default allCarsSlice.reducer;
