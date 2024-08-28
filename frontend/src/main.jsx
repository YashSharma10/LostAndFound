import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GlobalContextProvider from "./context/GlobalContextProvider.jsx";
// import AuthProvider from "./context/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="1054288691399-pjasu3r6f77sugpr1ff1n70gg4tpd5hh.apps.googleusercontent.com">
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </GoogleOAuthProvider>
);
