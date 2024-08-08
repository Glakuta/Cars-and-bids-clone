import { Button } from "primereact/button";
import React, { MouseEventHandler } from "react";

type Props = {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const PrimmaryButton = (props: Props) => {
  return (
    <div>
      <Button
        className="float-right bg-green-500 border-none w-36 hover:bg-yellow-600 hover:text-white"
        label={props.label}
        onClick={props.onClick}
      />
    </div>
  );
};

export default PrimmaryButton;
