import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import QuickInfoComponent from "../components/common/QuickInfoComponent";

export const Root = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <QuickInfoComponent subscribe={() => {}} />
    </>
  );
};
