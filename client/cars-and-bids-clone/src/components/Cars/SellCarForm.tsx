import React, { useState } from "react";
import { Car } from "../../utils/types/carsType";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
//import { InputNumber } from "primereact/inputnumber";
//import { ToggleButton } from "primereact/togglebutton";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { transmissions } from "../../assets/filters.json";
import { ToggleButton } from "primereact/togglebutton";
import TextInput from "../common/formComponnts/TextInput";
//import { FileUpload } from "primereact/fileupload";

interface CarTypes {
  car: Car;
  onSubmit: (values: Car) => void;
}

const initialValues: Car = {
  vin: "",
  year: "",
  make: "",
  model: "",
  transmission: "",
  mileage: "",
  specialOptions: "",
  carMods: true,
  modeDetails: "",
  carDamage: false,
  damageDetailis: "",
  carLocation: "",
  details: "",
};

const carValidationSchema = yup.object().shape({
  vin: yup.string().required("You need to provide vin number"),
  year: yup.string().required("You need to provide cars year of production"),
  make: yup.string().required("You need to provie make"),
  model: yup.string().required("You need provide model"),
  transmission: yup.string().required("You need to provide transmission"),
  mileage: yup.string().required("You need to provide millage"),
  details: yup.string(),
  specilaOptions: yup.string(),
  carMods: yup.boolean(),
  modsDetail: yup.string(),
  carDamage: yup.boolean(),
  damageDetails: yup.string(),
  location: yup.string(),
});

const SellCarForm: React.FC<CarTypes> = () => {
  //const [selectedTransmission, setSelectedTransmission] = useState<string>("");
  const [damaged, setDamaged] = useState<boolean>(false);
  const [modified, setModified] = useState<boolean>(false);
  const transmisions = transmissions;
  const transmisionOptions = transmisions.map((transmission: string) => {
    return transmission;
  });

  return (
    <div className="flex flex-col flex-wrap items-center justify-center w-full pt-24 m-auto md:w-2/4">
      <h1 className="mb-6 text-3xl font-semibold">Tell us about your car</h1>
      <p className="mx-4 text-base mb-7 ">
        Please give us some basics about yourself and the car you’d like to
        sell. We’ll also need details about the car’s title status as well as 6
        photos that highlight the car’s exterior and interior condition.
        <br />
        <br />
        We’ll respond to your application within a business day. Once accepted,
        we’ll ask for more details and at least 50 high-res photos, then work
        with you to build a custom and professional listing and get the auction
        live.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={carValidationSchema}
        onSubmit={(values) => {
          console.log("Modified:", values.carMods);
          console.log(values);
        }}
      >
        {({ values, handleSubmit, handleChange, handleBlur }) => (
          <Form>
            <div className="px-8 py-4 mx-4 mt-24 bg-gray-300 ">
              <h2 className="mb-6 text-2xl font-bold">Your Info</h2>
              <TextInput
                htmlFor="Vin"
                label="Vin"
                id="vin"
                name="vin"
                onChange={handleChange("vin")}
                onBlur={handleBlur}
                value={values.vin}
              />

              <div className="flex flex-col justify-between md:flex-row">
                <TextInput
                  htmlFor="Year"
                  label="Year"
                  id="year"
                  name="year"
                  onChange={handleChange("year")}
                  onBlur={handleBlur}
                  value={values.year}
                  style={{ width: "25vh" }}
                />
                <div className="flex flex-col gap-2 ">
                  <label htmlFor="Make">Make</label>
                  <InputText
                    id="make"
                    name="make"
                    onChange={handleChange("make")}
                    onBlur={handleBlur}
                    value={values.make}
                    style={{ width: "25vh" }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="Model">Model</label>
                  <InputText
                    id="model"
                    name="model"
                    onChange={handleChange("model")}
                    onBlur={handleBlur}
                    value={values.model}
                    style={{ width: "25vh" }}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col gap-2 mr-36">
                  <label htmlFor="Transmission">Transmission</label>
                  <Dropdown
                    id="transmission"
                    name="transmission"
                    options={transmisionOptions}
                    onChange={(selectedTransmission) =>
                      handleChange(selectedTransmission)
                    }
                    placeholder="Transmission type"
                    style={{ width: "35vh" }}
                    value={values.transmission}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="Mileage">Mileage</label>
                  <InputText
                    id="mileage"
                    name="mileage"
                    onChange={handleChange("mileage")}
                    onBlur={handleBlur}
                    style={{ width: "35vh" }}
                    value={values.mileage}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-10 ">
                <label htmlFor="Details">More details</label>
                <InputTextarea
                  id="details"
                  name="details"
                  onChange={handleChange("details")}
                  onBlur={handleBlur}
                  style={{ width: "100%", height: "29vh" }}
                  value={values.details}
                />
              </div>

              <div className="flex flex-col gap-2 mt-10 ">
                <label htmlFor="Car damage">Is car damaged?</label>
                <ToggleButton
                  checked={damaged}
                  name="carDamage"
                  onChange={(e) => {
                    console.log("Value:", e.value);
                    setDamaged(e.value);
                  }}
                />
              </div>

              <div className="flex flex-col gap-2 mt-10 ">
                <label htmlFor="Car modified">Is car modified?</label>
                <ToggleButton
                  checked={modified}
                  onChange={(e) => {
                    setModified(e.value);
                  }}
                  name="carMods"
                />
              </div>
              {modified ? (
                <div className="flex flex-col gap-2 mt-10 ">
                  <label htmlFor="Details">More details</label>
                  <InputTextarea
                    id="details"
                    name="details"
                    onChange={handleChange("details")}
                    onBlur={handleBlur}
                    style={{ width: "100%", height: "29vh" }}
                    value={values.details}
                  />
                </div>
              ) : (
                !modified
              )}
            </div>
            {/* <div className="px-8 py-10 mx-4 my-10 bg-gray-300 rounded-lg">
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
            </div> */}

            <Button
              label="Confirm"
              type="submit"
              style={{
                width: "49vh",
                height: "48px",
                backgroundColor: "#4ad493",
                border: "none",
                marginTop: "20px",
              }}
              onClick={() => handleSubmit()}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SellCarForm;
