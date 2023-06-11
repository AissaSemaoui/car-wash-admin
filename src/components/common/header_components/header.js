import React, { Fragment, useState } from "react";
import UserMenu from "./user-menu";
import { AlignLeft, MoreHorizontal } from "react-feather";

//images
import logo from "../../../assets/images/dashboard/multikart-logo.png";

const Header = () => {
  const [sidebar, setSidebar] = useState(true);
  const [rightSidebar, setRightSidebar] = useState(true);
  const [navMenus, setNavMenus] = useState(false);

  const toggle = () => {
    // setNavMenus((prevState) => ({
    // 	navMenus: !prevState.navMenus,
    // }));
    setNavMenus(!navMenus);
  };

  const openCloseSidebar = () => {
    if (sidebar) {
      setSidebar(false);
      document.querySelector(".page-main-header").classList.add("open");
      document.querySelector(".page-sidebar").classList.add("open");
      document.querySelector(".footer").classList.add("open");
    } else {
      setSidebar(true);
      document.querySelector(".page-main-header").classList.remove("open");
      document.querySelector(".page-sidebar").classList.remove("open");
      document.querySelector(".footer").classList.remove("open");
    }
  };

  return (
    <Fragment>
      {/* open */}
      <div className="page-main-header ">
        <div className="main-header-right row">
          <div className="main-header-left d-lg-none col-auto">
            <div className="logo-wrapper">
              <a href="index.html">
                <img className="blur-up lazyloaded" src={logo} alt="" />
              </a>
            </div>
          </div>
          <div className="mobile-sidebar col-auto p-0">
            <div className="media-body text-end switch-sm">
              <label className="switch">
                <a href="#javaScript" onClick={openCloseSidebar}>
                  <AlignLeft />
                </a>
              </label>
            </div>
          </div>
          <div className="nav-right col">
            <ul className={"nav-menus " + (navMenus ? "open" : "")}>
              <div>
                <UserMenu />
              </div>
            </ul>
            <div
              className="d-lg-none mobile-toggle pull-right"
              onClick={() => toggle()}
            >
              <MoreHorizontal />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
