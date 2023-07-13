import React, { useState } from "react";
import Sidebar from "./common/sidebar_components/sidebar";
import Footer from "./common/footer";
import Header from "./common/header_components/header";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

const App = (props) => {
  const { i18n } = useTranslation();

  const initialState = {
    ltr: true,
    divName: "RTL",
    lng: "EN",
  };

  const [side, setSide] = useState(initialState);

  const ChangeRtl = () => {
    if (i18n.language === "en") {
      document.body.classList.add("rtl");
      setSide({ divName: "LTR", lng: "AR" });
      i18n.changeLanguage("ar");
    } else {
      document.body.classList.remove("rtl");
      setSide({ divName: "RTL", lng: "EN" });
      i18n.changeLanguage("en");
    }
  };
  return (
    <div>
      <div className="page-wrapper">
        <Header />
        <div className="page-body-wrapper">
          <Sidebar />
          <div className="page-body">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
      <div className="btn-light custom-theme" onClick={() => ChangeRtl()}>
        {side.lng}
      </div>
    </div>
  );
};
export default App;
