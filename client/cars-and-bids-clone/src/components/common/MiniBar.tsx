import React from "react";
import { FaClock } from "react-icons/fa";

type Props = {
  dateExpire: number;
  bid: number;
};

const MiniBar = ({ dateExpire, bid }: Props) => {
  return (
    <div className="m-0 rounded-md overflow-hidden flex flex-grow-1 items-center bg-black">
      <ul className="flex items-center list-none">
        <li className="flex center border-box ">
          <FaClock style={{ width: "2px", height: "2px" }} />
          <span className="m-0 text-sm font-medium text-white ">
            {dateExpire}
          </span>
        </li>
        <li>
          <span className="mr-4 text-sm font-medium text-white ">Bid</span>
          <span className="m-0 text-sm font-medium text-white ">
            `$ ${bid}`
          </span>
        </li>
      </ul>
    </div>
  );
};

export default MiniBar;
