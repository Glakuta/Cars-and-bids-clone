import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Car, Cars } from "../../utils/types/carsType";
import Cookies from "js-cookie";
//import { User } from "../../utils/types/userTypes";

export const carsApi = createApi({
  reducerPath: "carsApi",
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
    getAllCars: builder.query<Cars, void>({
      query: () => {
        return {
          url: "api/v1/cars",
          method: "GET",
        };
      },
    }),
    getSingleCar: builder.query<Car, string>({
      query: (id) => {
        return {
          url: `api/v1/cars/${id}`,
          method: "GET",
        };
      },
    }),
    sellCar: builder.mutation<Car, Car>({
      query: (car) => ({
        url: "api/v1/cars",
        method: "POST",
        body: car,
        credentials: "include",
      }),
    }),
    bidCar: builder.mutation<Car, Car>({
      query: (car) => ({
        url: `api/v1/cars/${car._id}`,
        method: "PUT",
        body: car,
        credentials: "include",
      }),
    }),
    editCar: builder.mutation<Car, Car>({
      query: (car) => ({
        url: `api/v1/cars/${car._id}`,
        method: "PUT",
        body: car,
        credentials: "include",
      }),
    }),
    deleteCar: builder.mutation<Car, string>({
      query: (id) => ({
        url: `api/v1/cars/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useGetSingleCarQuery,
  useSellCarMutation,
  useBidCarMutation,
} = carsApi;
