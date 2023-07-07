import React from "react";
import logo from "../../../assets/images/logo.png";

const UserPanel = () => {
  return (
    <div>
      <div className="sidebar-user text-center">
        <div>
          <img className="logo__img" src={logo} alt="#" />
        </div>
        <h6 className="mt-3 f-14">Admin</h6>
      </div>
    </div>
  );
};

export default UserPanel;
