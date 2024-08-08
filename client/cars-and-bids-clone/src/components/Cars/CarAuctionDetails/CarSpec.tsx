import React from "react";
import { Car } from "../../../utils/types/carsType";

type Props = {
  car: Car;
};

const CarSpec = ({ car }: Props) => {
  return (
    <div>
      <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4 border-2 max-w-2xl">
        <dt className="border-2 font-semibold bg-gray-200">Make</dt>
        <dd>{car.make}</dd>
        <dt className="border-2 font-semibold bg-gray-200">Model</dt>
        <dd>{car.model}</dd>
        <dt className="border-2 font-semibold bg-gray-200">Milege</dt>
        <dd>{car.mileage}</dd>
        <dt className="border-2 font-semibold bg-gray-200">Vin</dt>
        <dd>{car.vin}</dd>
        <dt className="border-2 font-semibold bg-gray-200">Title Status</dt>
        <dd>{car.status}</dd>
        <dt className="border-2 font-semibold bg-gray-200">Location</dt>
        <dd>{car.location}</dd>
        <dt className="border-2 font-semibold bg-gray-200">Seller</dt>
        <dd>{car.seller}</dd>
        <dt className="border-2 font-semibold bg-gray-200">Engine</dt>
        <dd>{car.engine}</dd>
        <dt className="border-2 font-semibold bg-gray-200">Drivetrain</dt>
        <dd>{car.drivetrain}</dd>
        <dt className="border-2 font-semibold bg-gray-200">Transmision</dt>
        <dd>{car.transmission}</dd>
        <dt className="border-2 font-semibold bg-gray-200">Body Style</dt>
        <dd>{car.bodyStyle}</dd>
        <dt className="border-2 font-semibold bg-gray-200">Exterior Color</dt>
        <dd>{car.exteriorColor}</dd>
        <dt className="border-2 font-semibold bg-gray-200">Interior Color</dt>
        <dd>{car.interiorColor}</dd>
        <dt className="border-2 font-semibold bg-gray-200">Year</dt>
        <dd>{car.year}</dd>
      </dl>
    </div>
  );
};

export default CarSpec;
