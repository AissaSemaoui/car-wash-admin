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
import i18n from "./i18n/i18n";
import { I18nextProvider } from "react-i18next";

const Root = () => {
  return (
    <React.StrictMode>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
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
        </I18nextProvider>
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
