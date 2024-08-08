import { FileUpload } from "primereact/fileupload";
import React from "react";

type Props = {};

const UploadImages = (props: Props) => {
  return (
    <div>
      {" "}
      <div className="px-8 py-10 mx-4 my-10 bg-gray-300 rounded-lg">
        <h2 className="mb-6 text-2xl font-bold">Upload image</h2>
        <FileUpload
          name="demo[]"
          url={"/api/upload"}
          style={{ width: "full" }}
          chooseOptions={{
            style: {
              backgroundColor: "#4ad493",
              border: "none",
            },
          }}
          uploadOptions={{
            style: {
              backgroundColor: "#4ad493",
              border: "none",
              cursor: "pointer",
            },
          }}
          cancelOptions={{
            style: {
              backgroundColor: "red",
              border: "none",
              cursor: "pointer",
            },
          }}
          multiple
          accept="image/*"
          maxFileSize={0}
          emptyTemplate={
            <p className="m-0">Drag and drop files to here to upload.</p>
          }
        />
      </div>
    </div>
  );
};

export default UploadImages;
