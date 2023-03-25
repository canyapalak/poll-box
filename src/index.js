import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PollsContextProvider } from "./store/PollsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <PollsContextProvider>
      <App />
    </PollsContextProvider>
  </BrowserRouter>
);
