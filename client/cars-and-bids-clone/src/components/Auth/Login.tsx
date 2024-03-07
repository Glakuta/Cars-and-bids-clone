import { Formik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import * as yup from "yup";
import { LoginUserData } from "../../utils/types/userTypes";
import Cookies from "js-cookie";
import React from "react";
import { useLoginUserMutation } from "../../redux/api/authApi";

// type CustomFormikErrors = FormikErrors<{
//   email: string;
//   password: string;
//   passwordConfirm: string;
//   submit?: string;
// }>;

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Incorect email address")
    .required("Field required"),
  password: yup
    .string()
    .min(8, "Provide at least 2 characters")
    .required("Field required"),
  passwordConfirm: yup
    .string()
    .min(8, "Provide at least 2 characters")
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .nullable()
    .required("Field required"),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Login = (props: LoginUserData) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //const [cookies, setCookie] = useCookies(["jwt"]);
  const [loginUser] = useLoginUserMutation();
  return (
    <div className="flex flex-col items-center justify-around p-3 m-3">
      <h4 className="m-0 text-2xl font-bold text-center">Sign In</h4>
      <Formik
        initialValues={{
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          try {
            loginUser(values);
            Cookies.set("jwt", JSON.stringify(values.email), { path: "/" });
            setSubmitting(false);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            console.error(error);
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
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Email</label>
              <InputText
                name="email"
                aria-describedby="email-help"
                onChange={handleChange("email")}
                onBlur={handleBlur}
                value={values.email}
                style={{ width: "49vh" }}
                className={errors.email && touched.email ? "p-invalid" : ""}
              />
              {errors.email && touched.email && (
                <small className="p-error">{errors.email}</small>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <div className="flex justify-center">
                <Password
                  name="paassword"
                  //aria-describedby="password-help"
                  onChange={handleChange("password")}
                  onBlur={handleBlur}
                  inputStyle={{ width: "49vh" }}
                  value={values.password}
                  className={
                    errors.password && touched.password ? "p-invalid" : ""
                  }
                  toggleMask
                />
              </div>
              {errors.password && touched.password && (
                <small className="p-error">{errors.password}</small>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <div className="flex justify-center">
                <Password
                  name="paasswordConfirm,"
                  aria-describedby="password-help"
                  onChange={handleChange("passwordConfirm")}
                  onBlur={handleBlur}
                  inputStyle={{ width: "49vh" }}
                  value={values.passwordConfirm}
                  className={
                    errors.passwordConfirm && touched.passwordConfirm
                      ? "p-invalid"
                      : ""
                  }
                  toggleMask
                />
              </div>

              {errors.passwordConfirm && touched.passwordConfirm && (
                <small className="p-error">{errors.passwordConfirm}</small>
              )}
            </div>

            <Button
              label="Sign in"
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit()}
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

export default Login;
