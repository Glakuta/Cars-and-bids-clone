/* eslint-disable @typescript-eslint/no-unused-vars */
import SellCarForm from "./components/Cars/SellCarForm";
import NavBar from "./components/NavBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import QuickInfoComponent from "./components/common/QuickInfoComponent";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useAppSelector } from "./redux/store";
//import { useCookies } from "react-cookie";
//import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { setUser } from "./redux/features/authSlice";

function App() {
  const user = useAppSelector((state) => state.userState.user);
  return (
    <div>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile onClick={() => {}} />} />
          <Route
            path="/sell-car"
            element={<SellCarForm car={{}} onSubmit={() => {}} />}
          />
        </Routes>
      </Router>
      <QuickInfoComponent subscribe={() => {}} />
    </div>
  );
}

export default App;
