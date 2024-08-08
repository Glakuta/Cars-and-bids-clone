/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useGetAllCarsQuery } from "../../redux/api/carsApi";
import CarsCard from "./carsComponents/CarsCard";
import noImage from "../../assets/noImage.png";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

const ShowAuctionsComponent = (props: Props) => {
  const { data, isLoading, isSuccess, isError } = useGetAllCarsQuery();
  if (isLoading) {
    return <div className="flex flex-wrap mx-[-10px]">Loadnig...</div>;
  }

  if (isError) {
    return <div className="flex flex-wrap mx-[-10px]">Cannot load data</div>;
  }

  if (isSuccess && data.data.cars.length === 0) {
    return <div className="flex flex-wrap mx-[-10px]">No data</div>;
  }
  return (
    <div className="flex flex-wrap gap-4 mx-3">
      {data &&
        data.data.cars.map((car) => (
          <CarsCard
            key={car._id}
            img={noImage}
            imgAlt="Obrazek"
            title={`${car.year} ${car.make} ${car.model}`}
            location={car.location}
            auctionDescription={`~${car.mileage} ${car.transmission}`}
            carId={car._id}
          />
        ))}
    </div>
  );
};

export default ShowAuctionsComponent;
