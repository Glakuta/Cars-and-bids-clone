/* eslint-disable no-empty-pattern */
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Rating } from "primereact/rating";
import React, { useState } from "react";

type Props = {
  subscribe: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const QuickInfoComponent = ({}: Props) => {
  const [email, setEmail] = useState<string>("");

  const subscribe = () => {
    console.log("I'm subscribe");
  };

  return (
    <section className="flex flex-col justify-center gap-12 p-3 md:gap-32 items-left md:items-between md:flex-row mt-7">
      <div>
        <h6 className="mb-3 text-xl font-bold">Why Cars & Bids</h6>
        <ul className="grid grid-cols-2 md:gap-x-12">
          <li className="list-item">
            <strong className="border-b-[5px] border-yellow-300 ">
              18.000+
            </strong>
            <p>Auctions completed</p>
          </li>
          <li className="list-item">
            <strong className="border-b-[5px] border-yellow-300">$413+</strong>
            <p>Value of cars sold</p>
          </li>
          <li className="list-item">
            <strong className="border-b-[5px] border-yellow-300">83%</strong>
            <p>Sell-through rate</p>
          </li>
          <li className="list-item">
            <strong className="border-b-[5px] border-yellow-300">510k +</strong>
            <p>Registered members</p>
          </li>
        </ul>
      </div>
      <div className="mt-6">
        <h6 className="py-2 text-xl font-bold">Our customers love us!</h6>
        <div className="flex flex-col gap-2 py-2 whitespace-nowrap ">
          <Rating value={5} disabled cancel={false} className="mb-3" />
          <p>Erik N.</p>
          <p>Aug. 2022</p>
          {/* <p className="block w-3 whitespace-nowrap">
            Probably the best experience I've had selling a car privately. The
            listing team was exceptionally helpful, and I had funds just 3 days
            after the auction ended. Great experience.
          </p> */}
        </div>
      </div>
      <div className="flex flex-col">
        <h6 className="py-2 text-xl font-bold ">Get the daily email</h6>
        <InputText value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button
          label="Subscribe!"
          type="button"
          onClick={() => subscribe()}
          style={{
            width: "50%",
            padding: "10px",
            height: "48px",
            backgroundColor: "black",
            border: "none",
            marginTop: "20px",
          }}
        />
      </div>
    </section>
  );
};

export default QuickInfoComponent;
