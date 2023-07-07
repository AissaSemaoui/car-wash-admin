import React, { Fragment } from "react";
import { useAuthContext } from "../../../providers/AuthProvider";

//images import
import logo from "../../../assets/images/logo.png";

const UserMenu = () => {
  const { logOut } = useAuthContext();

  return (
    <Fragment>
      <li className="onhover-dropdown">
        <div className="media align-items-center">
          <img
            className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
            src={logo}
            alt="header-user"
          />
          <div className="dotted-animation">
            <span className="animate-circle"></span>
            <span className="main-circle"></span>
          </div>
        </div>
        <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
          <li onClick={logOut}>
            <span>
              <i data-feather="log-out"></i>Logout
            </span>
          </li>
        </ul>
      </li>
    </Fragment>
  );
};

export default UserMenu;
