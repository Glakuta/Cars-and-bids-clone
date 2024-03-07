import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import carsLogo from "../assets/cars-logo.png";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import Cookies from "js-cookie";
import AuthDialog from "./Auth/AuthDialog";
import { useAppSelector } from "../redux/store";
import { useLogoutMutation } from "../redux/api/authApi";
import { logOut } from "../redux/features/authSlice";

const NavBar = () => {
  const user = useAppSelector((state) => state.userState.user);
  const [logout] = useLogoutMutation();

  const [isAuthVisible, setIsAuthVisible] = useState<boolean>(false);
  const items: MenuItem[] = [
    { label: "Auctions", url: "/" },
    { label: "Sell Car", url: "/sell-car" },
    { label: "What's cars and bids", url: "/about-us" },
    { label: "Daily Email", url: "/newsteller" },
    !user
      ? {
          label: "Sign in",
          className: "bg-green-500 hover:bg-cyan-600 hover:text-white ",
          command: () => toogleAuth(),
        }
      : {},
  ];

  const userProfile: MenuItem = {
    label: "",
    icon: "pi pi-user",
    className: "absolute right-0",
    items: [
      { label: "Profile", url: "/profile" },
      { label: "Watchlist" },
      { label: "My Listings" },
      { label: "Settings" },
      {
        label: "Sign out",
        command: async () => {
          logout();
          Cookies.remove("jwt", { path: "/" });
          logOut();
        },
      },
    ],
  };
  const toogleAuth = () => {
    setIsAuthVisible(!isAuthVisible);
  };
  const start = (
    <img alt="logo" src={carsLogo} height="80" width="80" className="mr-2" />
  );
  const end = (
    <div className="flex flex-row items-center">
      <InputText placeholder="Search" type="text" className="w-full" />
      {user ? (
        <div className="relative">
          <Menubar model={[userProfile]} className="border-none bg-inherit" />
        </div>
      ) : null}
    </div>
  );

  //items.push(items.splice(4, 1)[0]);
  return (
    <nav className="relative flex flex-row card">
      <Menubar
        model={items}
        start={start}
        end={end}
        className="justify-between w-full text-xl font-semibold text-gray-400 bg-white"
      />
      <AuthDialog isVisible={isAuthVisible} onHide={toogleAuth} />
    </nav>
  );
};

export default NavBar;
