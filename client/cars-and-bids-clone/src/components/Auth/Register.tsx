import React from "react";
import { RegisterUserData } from "../../utils/types/userTypes";
import { Formik } from "formik";
import * as yup from "yup";
import { useRegisterUserMutation } from "../../redux/api/authApi";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

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
  passwordConfirm: yup.string().required("Password confirmation is required"),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Register = (props: RegisterUserData) => {
  const [registerUser] = useRegisterUserMutation();
  return (
    <div className="flex flex-col items-center justify-around p-3 m-3 ">
      <h4 className="m-0 text-2xl font-bold text-center">Sign Up</h4>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        validationSchema={RegistrarionSchema}
        onSubmit={(values, { setSubmitting }) => {
          try {
            registerUser(values);
            setSubmitting(false);
          } catch (error) {
            console.error(error);
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          handleBlur,
          isSubmitting,
          errors,
          touched,
        }) => (
          <>
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <InputText
                name="username"
                aria-describedby="username-help"
                onChange={handleChange("username")}
                onBlur={handleBlur}
                value={values.username}
                style={{ width: "50vh" }}
              />
              {errors.username && touched.username && (
                <small className="p-error">{errors.username}</small>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Email</label>
              <InputText
                name="email"
                aria-describedby="email-help"
                onChange={handleChange("email")}
                onBlur={handleBlur}
                value={values.email}
                style={{ width: "50vh" }}
              />
              {errors.email && touched.email && (
                <small className="p-error">{errors.email}</small>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <Password
                name="password"
                aria-describedby="password-help"
                onChange={handleChange("password")}
                onBlur={handleBlur}
                value={values.password}
                inputStyle={{ width: "50vh" }}
                toggleMask
              />
              {errors.password && touched.password && (
                <small className="p-error">{errors.password}</small>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Password
                name="passwordConfirm"
                aria-describedby="username-help"
                onChange={handleChange("passwordConfirm")}
                onBlur={handleBlur}
                value={values.passwordConfirm}
                inputStyle={{ width: "50vh" }}
                toggleMask
              />
              {errors.passwordConfirm && touched.passwordConfirm && (
                <small className="p-error">{errors.passwordConfirm}</small>
              )}
            </div>
            <Button
              label="Sign up"
              onClick={() => handleSubmit()}
              disabled={isSubmitting}
              style={{
                width: "49vh",
                height: "48px",
                backgroundColor: "#4ad493",
                border: "none",
                marginTop: "20px",
              }}
            />
          </>
        )}
      </Formik>
    </div>
  );
};

export default Register;
