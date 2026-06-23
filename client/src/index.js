import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Toaster } from "sonner";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              zIndex: 999999,
            },
          }}
        />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
