import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Tailwind from "primereact/passthrough/tailwind";
import { Provider } from "react-redux";
import { PrimeReactProvider } from "primereact/api";
import { store } from "./redux/store.ts";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  </PrimeReactProvider>
);
