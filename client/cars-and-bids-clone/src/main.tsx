import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Tailwind from "primereact/passthrough/tailwind";
import { PrimeReactProvider } from "primereact/api";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
    <App />
  </PrimeReactProvider>
);
