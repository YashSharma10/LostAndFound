import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GlobalContextProvider from "./context/GlobalContextProvider.jsx";
// import AuthProvider from "./context/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="957033742281-1rd2kunk0u0dmj4h822l7mf17bdc9go1.apps.googleusercontent.com">
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </GoogleOAuthProvider>
);
