/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import { useGetSingleCarQuery } from "../../../redux/api/carsApi";
import { useParams } from "react-router-dom";
import AuctionBar from "./AuctionBar";
import CommentSection from "../../common/commentComponents/commentSection";

type Props = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AuctionDetail = (props: Props) => {
  const param = useParams();
  const { data, isLoading, isSuccess, isError } = useGetSingleCarQuery(
    param.id as string
  );
  if (isError) {
    return <div>Cannot load data</div>;
  }

  return (
    <div className="flex flex-col p-10">
      <AuctionBar />
      <CommentSection commentValue={""} />
    </div>
  );
};

export default AuctionDetail;
