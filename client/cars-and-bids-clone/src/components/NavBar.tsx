import React from "react";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";

const NavBar = () => {
  const items: MenuItem[] = [
    { label: "Auctions", url: "/auctions" },
    { label: "Sell Car", url: "/sell-car" },
    { label: "What's cars and bids", url: "/about-us" },
    { label: "Daily Email", url: "/newsteller" },
    {
      label: "Sign in",
      url: "/login",
      className: "bg-green-500 hover:bg-cyan-600 hover:text-white ",
    },
  ];
  const start = (
    <img
      alt="logo"
      src="../assets/cars-logo.png"
      height="40"
      className="mr-2"></img>
  );
  const end = <InputText placeholder="Search" type="text" className="w-full" />;
  return (
    <div className="card flex flex-row">
      <Menubar
        model={items}
        start={start}
        end={end}
        className="w-full justify-between bg-white text-xl text-gray-400 font-semibold"
      />
    </div>
  );
};

export default NavBar;
