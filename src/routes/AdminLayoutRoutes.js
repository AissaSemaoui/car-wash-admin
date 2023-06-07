import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import App from "../components/app";
import Datatable from "../components/common/datatable";
import Dashboard from "../components/dashboard";
import Invoice from "../components/invoice";
import Reports from "../components/reports/report";
import Profile from "../components/settings/profile";
import ListBookings from "../components/bookings/list-bookings";
import SingleBooking from "../components/bookings/single-booking";
import ListPackages from "../components/packages/list-packages";
import SinglePackage from "../components/packages/single-package";
import ListExtraServices from "../components/extra-services/list-extra-services";
import ListAgents from "../components/agents/list-agents";
import SingleAgent from "../components/agents/single-agent";
import ListStaff from "../components/staff/list-staff";
import SingleStaff from "../components/staff/single-staff";

const AdminLayoutRoutes = () => {
  return (
    <Fragment>
      <Routes>
        <Route element={<App />}>
          <Route
            path={`${process.env.PUBLIC_URL}/bookings-list`}
            element={<ListBookings />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/bookings-list/:id`}
            element={<SingleBooking />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/packages-list`}
            element={<ListPackages />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/packages-list/:id`}
            element={<SinglePackage />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/extra-services`}
            element={<ListExtraServices />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/agents-list`}
            element={<ListAgents />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/agents-list/:id`}
            element={<SingleAgent />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/staff-list`}
            element={<ListStaff />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/staff-list/:id`}
            element={<SingleStaff />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/dashboard`}
            element={<Dashboard />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/data-table`}
            element={<Datatable />}
          />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default AdminLayoutRoutes;
