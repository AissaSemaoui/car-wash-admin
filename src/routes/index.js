import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/auth/login";
import AdminLayoutRoutes from "./AdminLayoutRoutes";
import withAuth from "../hoc/withAuth";

const Routers = () => {
  const AuthorizedRoutes = withAuth(AdminLayoutRoutes);
  return (
    <Fragment>
      <Routes>
        <Route exact path={`${process.env.PUBLIC_URL}/`} element={<Login />} />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/auth/login`}
          element={<Login />}
        />
        {<Route path="/*" element={<AuthorizedRoutes />} />}
      </Routes>
    </Fragment>
  );
};

export default Routers;
