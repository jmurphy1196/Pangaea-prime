import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import configureStore from "./store/index.js";
import { csrfFetch, restoreCSRF } from "./store/csrf.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./styles/globals/main.css";

const store = configureStore();

// eslint-disable-next-line
if (process.env.NODE_ENV !== "production") {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
