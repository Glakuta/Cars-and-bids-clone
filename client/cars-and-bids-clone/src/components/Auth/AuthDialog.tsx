import React, { useState } from "react";

import { Dialog } from "primereact/dialog";
import { FaCarSide } from "react-icons/fa";
import Register from "./Register";
import Login from "./Login";

interface AuthDialogProps {
  isVisible: boolean;
  onHide: () => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ isVisible, onHide }) => {
  const [showRegister, setShowRegister] = useState<boolean>(false);

  const toggleView = () => {
    setShowRegister((prevState) => !prevState);
  };

  return (
    <Dialog
      visible={isVisible}
      onHide={onHide}
      style={{
        width: "30vw",
        overflowY: "auto",
        verticalAlign: "initial",
        minHeight: "100vh",
      }}
      breakpoints={{ "960px": "75vw", "640px": "100vw" }}
      blockScroll={false}
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
        <Register username={""} email={""} password={""} passwordConfirm={""} />
      ) : (
        <Login email="" password="" passwordConfirm="" />
      )}
      <p className="text-center">
        {showRegister ? "Already have an account?" : "Do you want to sign up?"}
        <a onClick={toggleView} className="p-0 m-0 text-green-500 no-underline">
          {showRegister ? "Sign in!" : "Sign up?"}
        </a>
      </p>
    </Dialog>
  );
};

export default AuthDialog;
