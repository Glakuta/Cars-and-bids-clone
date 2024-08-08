import { InputTextarea } from "primereact/inputtextarea";
import PrimaryButton from ".././buttons/primmaryButton";
import React, { MouseEventHandler, ReactEventHandler } from "react";

type Props = {
  value: string | undefined;
  isReplyingTo?: () => void;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onChange: (e: ReactEventHandler) => void;
};

const CommentInput = (props: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <InputTextarea
        rows={2}
        cols={30}
        placeholder="Add a comment"
        autoResize
        value={props.value}
        style={{ maxWidth: "50%", height: "50px" }}
      />
      <PrimaryButton label="Comment" onClick={props.onClick} />
    </div>
  );
};

export default CommentInput;
