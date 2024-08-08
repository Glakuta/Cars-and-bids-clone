/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import SellCarForm from "./components/Cars/SellCarForm";
import NavBar from "./components/NavBar";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useParams,
} from "react-router-dom";
import QuickInfoComponent from "./components/common/QuickInfoComponent";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useAppSelector } from "./redux/store";
import CarsCard from "./components/common/carsComponents/CarsCard";
import { Root } from "./pages/Root";
import AuctionDetail from "./components/Cars/CarAuctionDetails/AuctionDetail";
import { useGetSingleCarQuery } from "./redux/api/carsApi";
//import { useCookies } from "react-cookie";
//import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { setUser } from "./redux/features/authSlice";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/profile/:id" element={<Profile onClick={() => {}} />} />
        <Route path="car/:id" element={<AuctionDetail />} />
        <Route
          path="/sell-car"
          element={<SellCarForm car={{}} onSubmit={() => {}} />}
        />
      </Route>
    )
  );

  const user = useAppSelector((state) => state.userState.user);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
