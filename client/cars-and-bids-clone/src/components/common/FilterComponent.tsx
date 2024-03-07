import { Dropdown } from "primereact/dropdown";
import {
  transmissions,
  BodyStyle,
  SearchOptions,
} from "../../assets/filters.json";
import React, { useState } from "react";
import { Button } from "primereact/button";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FilterComponent = (props: Props) => {
  const [selectedYear, setSelectedYear] = useState<string>();
  const [selectedTransmission, setSelectedTransmission] = useState<string>();
  const [selectedBodyStyle, setSelectedBodyStyle] = useState<string>();
  return (
    <section className="flex flex-col justify-between gap-2 items-left md:items-center md:flex-row mt-7">
      <div className="flex flex-col gap-2 mx-2 md:flex-row">
        <Dropdown
          value={selectedYear}
          placeholder="Year"
          className="w-full md:w-[10rem] border-[#E5E5E5]"
          options={[]}
          onChange={(e) => setSelectedYear(e.value)}
        />
        <Dropdown
          value={selectedTransmission}
          placeholder="Transmission"
          className="w-full md:w-[10rem] border-[#E5E5E5]"
          options={transmissions}
          onChange={(e) => setSelectedTransmission(e.value)}
        />
        <Dropdown
          value={selectedBodyStyle}
          placeholder="Body Style"
          className="w-full md:w-[10rem] border-[#E5E5E5]"
          options={BodyStyle}
          onChange={(e) => setSelectedBodyStyle(e.value)}
        />
      </div>
      <div className="flex flex-col gap-2 m-2 md:flex-row">
        {SearchOptions.map((option) => (
          <Button
            className="bg-[#e5e5e500] hover:bg-[#E5E5E5] border-none text-[#CECECE]"
            label={option}
          />
        ))}
      </div>
    </section>
  );
};

export default FilterComponent;
