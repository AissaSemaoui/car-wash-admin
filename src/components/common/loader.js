import React from "react";
import { Spinner } from "reactstrap";

const Loader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center max-vh-100"
      style={{ minHeight: "500px", height: "100%" }}
    >
      <Spinner color="primary" style={{ width: "3rem", height: "3rem" }} />
    </div>
  );
};

export default Loader;
