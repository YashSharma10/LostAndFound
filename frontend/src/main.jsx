import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GlobalContextProvider from "./context/GlobalContextProvider.jsx";
// import AuthProvider from "./context/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="707051850826-dkdq5hfrlequsi79qjoektir6n5nletm.apps.googleusercontent.com">
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </GoogleOAuthProvider>
);
