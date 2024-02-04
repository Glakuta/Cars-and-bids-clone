import React, { useState } from "react";
//import { User } from "../../utils/types/userTypes";
import { Formik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import { FaCarSide } from "react-icons/fa";
//import { useRegisterUserMutation } from "../../redux/api/authApi";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../../redux/api/authApi";
// //import {
//   useLoginUserMutation,
//   useRegisterUserMutation,
// } from "../../redux/api/authApi";

interface AuthDialogProps {
  isVisible: boolean;
  onHide: () => void;
}

const RegistrarionSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Incorect email address")
    .required("Field required"),
  password: yup
    .string()
    .min(8, "Password need to have at least 8 characters")
    .matches(/[A-Z]/, "Password need to have at least one capitol leater")
    .matches(/[0-9]/, "Password need to have at least one number")

    .required("Pole wymagane"),
  confirmPassword: yup.string().required("Password confirmation is required"),
});

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Incorect email address")
    .required("Field required"),
  password: yup
    .string()
    .min(8, "Provide at least 2 characters")
    .required("Field required"),
});

const AuthDialog: React.FC<AuthDialogProps> = ({ isVisible, onHide }) => {
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [loginUser] = useLoginUserMutation();
  const [registerUser] = useRegisterUserMutation();

  return (
    <Dialog
      visible={isVisible}
      onHide={onHide}
      style={{ width: "50vw" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
    >
      <div className="flex flex-row items-center justify-end">
        <i className="pi pi-times" style={{ fontSize: "1.5rem" }}></i>
      </div>
      <FaCarSide
        style={{
          width: "72px",
          height: "72px",
          color: "black",
          margin: "auto",
          bottom: "-30px",
        }}
      />
      {showRegister ? (
        <div className="flex flex-col items-center justify-around p-3 m-3">
          <h4 className="m-0 text-2xl font-bold text-center">Sign Up</h4>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={RegistrarionSchema}
            onSubmit={(values) => registerUser(values)}
          >
            {({ values, handleSubmit, handleChange, handleBlur }) => (
              <>
                <div className="flex flex-col ">
                  <label htmlFor="username">Username</label>
                  <InputText
                    name="username"
                    aria-describedby="username-help"
                    onChange={handleChange("username")}
                    onBlur={handleBlur}
                    value={values.username}
                    style={{ width: "49vh" }}
                  />
                  <small id="username-help">Username is required</small>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="username">Email</label>
                  <InputText
                    name="email"
                    aria-describedby="email-help"
                    onChange={handleChange("email")}
                    onBlur={handleBlur}
                    value={values.email}
                    style={{ width: "49vh" }}
                  />
                  <small id="email-help">Email is required</small>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="password">Password</label>
                  <Password
                    name="password"
                    aria-describedby="password-help"
                    onChange={handleChange("password")}
                    onBlur={handleBlur}
                    value={values.password}
                    inputStyle={{ width: "49vh" }}
                    toggleMask
                  />
                  <small id="password-help">Password is required</small>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Password
                    name="confirmPassword"
                    aria-describedby="username-help"
                    onChange={handleChange("confirmPassword")}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    inputStyle={{ width: "49vh" }}
                    toggleMask
                  />
                  <small id="confirmPassword-help">
                    Password confirmation is required.
                  </small>
                </div>
                <Button
                  label="Sign up"
                  onClick={() => handleSubmit()}
                  style={{
                    width: "49vh",
                    height: "48px",
                    backgroundColor: "#4ad493",
                    border: "none",
                    marginTop: "20px",
                  }}
                />
                <p>
                  Do you want
                  <a
                    onClick={() => setShowRegister(false)}
                    className="p-0 m-0 text-green-500 no-underline"
                  >
                    Sign up?
                  </a>
                </p>
              </>
            )}
          </Formik>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-around p-3 m-3">
          <h4 className="m-0 text-2xl font-bold text-center">Sign In</h4>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => loginUser(values)}
          >
            {({ values, handleSubmit, handleChange, handleBlur }) => (
              <>
                <div className="flex flex-col gap-2">
                  <label htmlFor="username">Email</label>
                  <InputText
                    name="email"
                    aria-describedby="email-help"
                    onChange={handleChange("email")}
                    onBlur={handleBlur}
                    value={values.email}
                    style={{ width: "49vh" }}
                  />
                  <small id="email-help">Email is required</small>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="password">Password</label>
                  <div className="flex justify-center">
                    <Password
                      name="paassword"
                      aria-describedby="password-help"
                      onChange={handleChange("password")}
                      onBlur={handleBlur}
                      inputStyle={{ width: "49vh" }}
                      value={values.password}
                      toggleMask
                    />
                  </div>

                  <small id="password-help">Password is required</small>
                </div>
                <Button
                  label="Sign in"
                  onClick={() => handleSubmit}
                  style={{
                    width: "49vh",
                    height: "48px",
                    backgroundColor: "#4ad493",
                    border: "none",
                    marginTop: "20px",
                  }}
                />
                <p className="mt-6">
                  Already have account?
                  <a
                    onClick={() => setShowRegister(true)}
                    className="p-0 m-0 text-green-500 no-underline"
                  >
                    Sign in!
                  </a>
                </p>
              </>
            )}
          </Formik>
        </div>
      )}
    </Dialog>
  );
};

export default AuthDialog;
