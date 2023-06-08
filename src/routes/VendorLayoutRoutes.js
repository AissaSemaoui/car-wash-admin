import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import App from "../components/app";
import Datatable from "../components/common/datatable";
import Createcoupons from "../components/coupons/create-coupons";
import ListCoupons from "../components/coupons/list-coupons";
import Dashboard from "../components/dashboard";
import Invoice from "../components/invoice";
import Translations from "../components/localization/translations";
import Media from "../components/media/media";
import Digitaladdpro from "../components/products/digital/digital-add-pro";
import Digitalcategory from "../components/products/digital/digital-category";
import Digitalprolist from "../components/products/digital/digital-pro-list";
import Digitalsubcategory from "../components/products/digital/digital-sub-category";
import Addproduct from "../components/products/physical/add-product";
import Category from "../components/products/physical/category";
import Productdetail from "../components/products/physical/product-Details";
import Productlist from "../components/products/physical/product-list";
import Subcategory from "../components/products/physical/sub-category";
import Reports from "../components/reports/report";
import Orders from "../components/sales/orders";
import Transactionsales from "../components/sales/transactions-sales";
import Profile from "../components/settings/profile";

const VendorLayoutRoutes = () => {
  return (
    <Fragment>
      <Routes>
        <Route element={<App />}>
          <Route
            path={`${process.env.PUBLIC_URL}/dashboard`}
            element={<Dashboard />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/products/physical/category`}
            element={<Category />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/physical/sub-category`}
            element={<Subcategory />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/physical/product-list`}
            element={<Productlist />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/physical/product-Details`}
            element={<Productdetail />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/physical/add-product`}
            element={<Addproduct />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/products/digital/digital-category`}
            element={<Digitalcategory />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/digital/digital-sub-category`}
            element={<Digitalsubcategory />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/digital/digital-product-list`}
            element={<Digitalprolist />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/digital/digital-add-product`}
            element={<Digitaladdpro />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/sales/orders`}
            element={<Orders />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/sales/transactions`}
            element={<Transactionsales />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/coupons/list-coupons`}
            element={<ListCoupons />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/coupons/create-coupons`}
            element={<Createcoupons />}
          />

          <Route path={`${process.env.PUBLIC_URL}/media`} element={<Media />} />

          <Route
            path={`${process.env.PUBLIC_URL}/localization/transactions`}
            element={<Translations />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/reports/report`}
            element={<Reports />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/settings/profile`}
            element={<Profile />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/invoice`}
            element={<Invoice />}
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

export default VendorLayoutRoutes;
