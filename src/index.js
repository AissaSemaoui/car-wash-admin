import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import Routers from "./routes";
import PerfectScrollbar from "react-perfect-scrollbar";
import RolesProvider from "./providers/RolesProvider";
import AuthProvider from "./providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import ThemeProvider from "./providers/ThemeProvider";

const Root = () => {
  return (
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter basename={"/"}>
          <PerfectScrollbar>
            <RolesProvider>
              <ThemeProvider>
                <Routers />
              </ThemeProvider>
            </RolesProvider>
          </PerfectScrollbar>
          <ToastContainer />
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
