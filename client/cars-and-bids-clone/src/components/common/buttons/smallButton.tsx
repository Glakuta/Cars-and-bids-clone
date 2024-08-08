import { Button } from "primereact/button";
import React from "react";

type Props = {
  icon?: string;
  label?: string;
  numberVotes?: number;
  onClick: () => void;
};

const SmallButton = (props: Props) => {
  return (
    <div>
      <Button
        style={{
          padding: "0 12px",
          backgroundColor: "white",
          borderColor: "#DADADA",
          borderRadius: "10px",
          color: "#828292",
          fontSize: "14px",
          height: "24px",
          alignItems: "center",
          transition: "none",
          cursor: "pointer",
        }}
        label={props.label}
        icon={props.icon}
        onClick={props.onClick}
      />
    </div>
  );
};

export default SmallButton;
