import React from "react";
import MiniBar from "./MiniBar";

type Props = {
  img: string;
  imgAlt: string;
  title: string;
  bid: number;
  location: string;
  auctionDescription: string;
};

const CarsCard = ({
  img,
  imgAlt,
  title,
  bid,
  location,
  auctionDescription,
}: Props) => {
  return (
    <a className="box-border block p-0 m-0 border-0" onClick={}>
      <div className="block mb-4">
        <div>
          <img
            src={img}
            alt={imgAlt}
            className="block object-cover w-full h-full align-middle opacity-0"
          />
        </div>
        <div>
          <MiniBar dateExpire={0} bid={0} />
        </div>
      </div>
      <div className="box-border block ">
        <a href="" className="mr-3 text-base font-bold text-black">
          {title}
        </a>
        <p className="mt-2 text-base font-normal ">{auctionDescription}</p>
        <p className="mt-2 text-base font-light ">{location}</p>
      </div>
    </a>
  );
};

export default CarsCard;
