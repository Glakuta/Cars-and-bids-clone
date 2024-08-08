import { Dialog } from "primereact/dialog";
import React from "react";
import TextInput from "../formComponnts/TextInput";
import PrimmaryButton from "../buttons/primmaryButton";
import { Formik } from "formik";
import * as yup from "yup";
//import { useBidCarMutation } from "../../../redux/api/carsApi";

type Props = {
  isVisible: boolean;
  onHide: () => void;
};

const bidSchema = yup.object().shape({
  bid: yup.string().required("Field required"),
});

const BidModal = ({ isVisible, onHide }: Props) => {
  return (
    <Dialog
      className="flex flex-col items-center justify-around p-3 m-3"
      visible={isVisible}
      onHide={onHide}
    >
      <div className="flex flex-row items-center justify-end">
        <i className="pi pi-times" style={{ fontSize: "1.5rem" }}></i>
      </div>
      <h3 className="pb-6 m-0 text-2xl font-bold text-center">Place Bid</h3>
      <Formik
        initialValues={{ bid: "" }}
        validationSchema={bidSchema}
        onSubmit={() => {
          console.log("Submitted");
        }}
      >
        {({ values, handleSubmit, handleChange, handleBlur }) => (
          <>
            <TextInput
              label="Bid"
              id="bid"
              name="bid"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.bid}
              style={{ marginBottom: "1.5rem" }}
            ></TextInput>
            <PrimmaryButton
              onClick={() => {
                handleSubmit();
              }}
              label="Bid"
            ></PrimmaryButton>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

export default BidModal;
