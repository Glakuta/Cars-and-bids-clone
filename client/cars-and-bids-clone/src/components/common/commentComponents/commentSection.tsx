/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import CommentBody from "./commentBody";
import CommentInput from "./commentInput";
import { useGetAllCommentsQuery } from "../../../redux/api/commentsApi";
import { useParams } from "react-router-dom";
import profileImg from "../../../assets/profileImg.png";
import * as yup from "yup";
import Formik from "formik";

type Props = {
  commentValue: string;
};

const CommentSectionSchema = yup.object().shape({
  commentValue: yup.string().required("Comment is required"),
  replayingTo: yup.string(),
});

const CommentSection = (props: Props) => {
  const id = useParams();
  const { data } = useGetAllCommentsQuery();

  const [replayingTo, setReplayingTo] = useState<string>("");
  const [isEditActive, setIsEditActive] = useState<boolean>(false);
  const showReplay = () => {
    setIsEditActive((prevState) => !prevState);
  };

  return (
    <div>
      <h3 className="py-10 text-2xl font-bold">Comments and Bids</h3>
      <div>
        <CommentInput
          value=""
          onClick={() => console.log("Comment")}
          onChange={() => console.log("Comment")}
        />
      </div>
      <ul className="flex flex-col px-[4px] list-none ">
        <CommentBody
          username={"glakuta"}
          date={"1 month ago"}
          commentBody={"This is a comment"}
          image={profileImg}
          replay={showReplay}
          numberVotes={10}
          vote={() => console.log("Vote")}
        />
        {isEditActive ? (
          <CommentInput
            value={""}
            onClick={() => console.log("Comment")}
            onChange={() => console.log("Comment")}
          />
        ) : null}
      </ul>
    </div>
  );
};

export default CommentSection;
