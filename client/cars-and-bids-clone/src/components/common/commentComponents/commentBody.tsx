import React from "react";
import SmallButton from "../buttons/smallButton";

type Props = {
  username: string;
  date: string;
  commentBody: string;
  image: string;
  numberVotes: number;
  replay: () => void;
  vote: () => void;
};

const CommentBody = (props: Props) => {
  return (
    <li>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <div>
            <img
              className="rounded-full max-h-10 max-w-10"
              src={props.image || "../../../assets/profileImg.png"}
            />
          </div>
          <div className="flex flex-row gap-2 my-auto">
            <h6 className="text-sm font-semibold">{props.username}</h6>
            <p className="my-auto text-xs text-gray-400">{props.date}</p>
          </div>
        </div>
        <div className="mb-2 break-words">{props.commentBody}</div>
      </div>
      <div className="flex flex-row gap-2">
        <SmallButton
          label={props.numberVotes as unknown as string}
          onClick={props.vote}
        />
        <SmallButton label="Replay" onClick={props.replay} />
      </div>
    </li>
  );
};

export default CommentBody;
