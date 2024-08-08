import React from "react";
import { FaClock } from "react-icons/fa";

type Props = {
  dateExpire: number;
  bid: number;
};

const MiniBar = ({ dateExpire, bid }: Props) => {
  return (
    <div className="flex items-center m-0 overflow-hidden bg-black rounded-md flex-grow-1">
      <ul className="flex items-center mx-auto list-none">
        <li className="flex center border-box ">
          <FaClock style={{ width: "2px", height: "2px" }} />
          <span className="m-0 text-sm font-medium text-white ">
            {dateExpire}
          </span>
        </li>
        <li>
          <span className="mr-4 text-sm font-medium text-white ">Bid</span>
          <span className="m-0 text-sm font-medium text-white ">`$ {bid}`</span>
        </li>
      </ul>
    </div>
  );
};

export default MiniBar;
