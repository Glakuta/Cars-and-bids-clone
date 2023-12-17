import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Tailwind from "primereact/passthrough/tailwind";
import { Provider } from "react-redux";
import { PrimeReactProvider } from "primereact/api";
import { store } from "./redux/store.ts";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
      <Router>
        <App />
      </Router>
    </PrimeReactProvider>
  </Provider>
);
