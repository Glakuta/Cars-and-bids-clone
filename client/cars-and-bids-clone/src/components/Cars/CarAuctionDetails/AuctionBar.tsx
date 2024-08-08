import React, { useState } from "react";
import PrimmaryButton from "../../common/buttons/primmaryButton";
import BidModal from "../../common/carsComponents/BidModal";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AuctionBar = (props: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleView = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="flex flex-wrap gap-3">
      <ul className="flex flex-row items-center justify-around h-12 max-w-xl gap-5 px-5 bg-gray-800 rounded-md">
        <li className="flex flex-row gap-3 my-auto">
          <p className="text-lg font-semibold text-gray-300 whitespace-nowrap">
            Time left
          </p>
          <p className="text-lg font-semibold text-white whitespace-nowrap"></p>
        </li>
        <li className="flex flex-row gap-3 my-auto">
          <p className="text-lg font-semibold text-gray-300 whitespace-nowrap">
            Highest Bid
          </p>
          <p className="text-lg font-semibold text-white whitespace-nowrap">
            $32 000
          </p>
        </li>
        <li className="flex flex-row gap-3 my-auto">
          <p className="text-lg font-semibold text-gray-300 whitespace-nowrap">
            Bids
          </p>
          <p className="text-lg font-semibold text-white whitespace-nowrap"></p>
        </li>
        <li className="flex flex-row gap-3 my-auto">
          <p className="text-lg font-semibold text-gray-300 whitespace-nowrap">
            Comments
          </p>
          <p className="text-lg font-semibold text-white whitespace-nowrap"></p>
        </li>
      </ul>
      <BidModal isVisible={isVisible} onHide={toggleView} />
      <PrimmaryButton label={"Place Bid"} onClick={toggleView} />
    </div>
  );
};

export default AuctionBar;
