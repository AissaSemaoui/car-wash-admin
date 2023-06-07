import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { FormGroup, label, Button, ModalFooter, ModalBody } from "reactstrap";

function PackageForm({ data, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });

  return (
    <Fragment>
      <form
        className="needs-validation user-add"
        noValidate=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalBody>
          <h4>Package Details</h4>
          <FormGroup className="row">
            <label className="col-xl-3 col-md-4">
              <span>*</span> Package Name
            </label>
            <div className="col-xl-8 col-md-7">
              <input
                placeholder="Enter package name..."
                className={`form-control ${
                  errors.packagename ? "is-invalid" : ""
                }`}
                id="validationCustom0"
                type="text"
                {...register("packagename", { required: true })}
              />
              {errors.packagename && (
                <span className="invalid-feedback">
                  {errors.packagename.message}
                </span>
              )}
            </div>
          </FormGroup>
          <FormGroup className="row">
            <h5>Prices : </h5>
            <label className="col-xl-3 col-md-4">
              <span>*</span> SUV Price
            </label>
            <div className="col-xl-8 col-md-7">
              <input
                placeholder="Enter SUV price..."
                className={`form-control ${
                  errors.packageprice?.suv ? "is-invalid" : ""
                }`}
                id="validationCustom1"
                type="number"
                {...register("packageprice.suv", { required: true })}
              />
              {errors.packageprice?.suv && (
                <span className="invalid-feedback">
                  Please enter the SUV price
                </span>
              )}
            </div>
          </FormGroup>
          <FormGroup className="row">
            <label className="col-xl-3 col-md-4">
              <span>*</span> Sedan Price
            </label>
            <div className="col-xl-8 col-md-7">
              <input
                placeholder="Enter Sedan price..."
                className={`form-control ${
                  errors.packageprice?.sedan ? "is-invalid" : ""
                }`}
                id="validationCustom2"
                type="number"
                {...register("packageprice.sedan", { required: true })}
              />
              {errors.packageprice?.sedan && (
                <span className="invalid-feedback">
                  Please enter the Sedan price
                </span>
              )}
            </div>
          </FormGroup>
          <FormGroup className="row">
            <label className="col-xl-3 col-md-4">
              <span>*</span> Pickup Price
            </label>
            <div className="col-xl-8 col-md-7">
              <input
                placeholder="Enter Pickup price..."
                className={`form-control ${
                  errors.packageprice?.pickup ? "is-invalid" : ""
                }`}
                id="validationCustom3"
                type="number"
                {...register("packageprice.pickup", { required: true })}
              />
              {errors.packageprice?.pickup && (
                <span className="invalid-feedback">
                  Please enter the Pickup price
                </span>
              )}
            </div>
          </FormGroup>
          <FormGroup className="row">
            <label className="col-xl-3 col-md-4">
              <span>*</span> Bike Price
            </label>
            <div className="col-xl-8 col-md-7">
              <input
                placeholder="Enter Bike price..."
                className={`form-control ${
                  errors.packageprice?.bike ? "is-invalid" : ""
                }`}
                id="validationCustom4"
                type="number"
                {...register("packageprice.bike", { required: true })}
              />
              {errors.packageprice?.bike && (
                <span className="invalid-feedback">
                  Please enter the Bike price
                </span>
              )}
            </div>
          </FormGroup>
          <FormGroup className="row">
            <h5>Features : </h5>
            <label className="col-xl-3 col-md-4">
              <span>*</span> Package Features
            </label>
            <div className="col-xl-8 col-md-7">
              <input
                placeholder="Enter package features (comma-separated)..."
                className={`form-control ${
                  errors.packagefeatures ? "is-invalid" : ""
                }`}
                id="validationCustom5"
                type="text"
                {...register("packagefeatures", { required: true })}
              />
              {errors.packagefeatures && (
                <span className="invalid-feedback">
                  Please enter the package features
                </span>
              )}
            </div>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </ModalFooter>
      </form>
    </Fragment>
  );
}

export default PackageForm;
