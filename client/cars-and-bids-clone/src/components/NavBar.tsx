import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import AuthDialog from "./Auth/Register";

const NavBar = () => {
  const [isAuthVisible, setIsAuthVisible] = useState<boolean>(false);
  const items: MenuItem[] = [
    { label: "Auctions", url: "/auctions" },
    { label: "Sell Car", url: "/sell-car" },
    { label: "What's cars and bids", url: "/about-us" },
    { label: "Daily Email", url: "/newsteller" },
    {
      label: "Sign in",
      className: "bg-green-500 hover:bg-cyan-600 hover:text-white ",
      command: () => toogleAuth(),
    },
  ];
  const toogleAuth = () => {
    setIsAuthVisible(!isAuthVisible);
  };
  const start = (
    <img
      alt="logo"
      src="../assets/cars-logo.png"
      height="40"
      className="mr-2"
    ></img>
  );
  const end = <InputText placeholder="Search" type="text" className="w-full" />;
  return (
    <div className="flex flex-row card">
      <Menubar
        model={items}
        start={start}
        end={end}
        className="justify-between w-full text-xl font-semibold text-gray-400 bg-white"
      />
      <AuthDialog isVisible={isAuthVisible} onHide={toogleAuth} />
    </div>
  );
};

export default NavBar;
