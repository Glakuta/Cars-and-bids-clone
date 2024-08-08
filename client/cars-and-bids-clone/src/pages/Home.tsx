/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import FilterComponent from "../components/common/FilterComponent";
import ShowAuctionsComponent from "../components/common/showAuctionsComponent";

type Props = {};

const Home = (props: Props) => {
  return (
    <section>
      <FilterComponent />
      <ShowAuctionsComponent />
    </section>
  );
};

export default Home;
