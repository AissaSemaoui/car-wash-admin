import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormGroup, Button, ModalFooter, ModalBody } from "reactstrap";

function PackageForm({ data, onSubmit }) {
  const { t } = useTranslation("packages");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...data?.washPackage,
      packagefeatures: data?.washPackage?.packagefeatures?.join(","),
    },
  });

  return (
    <Fragment>
      <form
        className="needs-validation user-add"
        noValidate=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalBody>
          <h4>{t("Package Details")}</h4>
          <FormGroup className="row">
            <label className="col-xl-3 col-md-4">
              <span>*</span> {t("common:packageName")}
            </label>
            <div className="col-xl-8 col-md-7">
              <input
                placeholder={t("Enter package name")}
                className={`form-control ${
                  errors.packagename ? "is-invalid" : ""
                }`}
                id="validationCustom0"
                type="text"
                {...register("packagename", { required: true })}
              />
              {errors.packagename && (
                <span className="error-message">
                  {errors.packagename.message}
                </span>
              )}
            </div>
          </FormGroup>
          <FormGroup className="row">
            <h5>{t("Prices")} : </h5>
            <label className="col-xl-3 col-md-4">
              <span>*</span>{" "}
              {t("Vehicle Price", {
                vehicleType: "SUV",
              })}
            </label>
            <div className="col-xl-8 col-md-7">
              <input
                placeholder={t("Enter Vehicle Price", { vehicleType: "SUV" })}
                className={`form-control ${
                  errors.packageprice?.suv ? "is-invalid" : ""
                }`}
                id="validationCustom1"
                type="number"
                step="0.1"
                {...register("packageprice.suv", { required: true })}
              />
              {errors.packageprice?.suv && (
                <span className="error-message">
                  {t("Please Enter Vehicle Price", { vehicleType: "SUV" })}
                </span>
              )}
            </div>
          </FormGroup>
          <FormGroup className="row">
            <label className="col-xl-3 col-md-4">
              <span>*</span>{" "}
              {t("Vehicle Price", {
                vehicleType: "Sedan",
              })}
            </label>
            <div className="col-xl-8 col-md-7">
              <input
                placeholder={t("Enter Vehicle Price", { vehicleType: "Sedan" })}
                className={`form-control ${
                  errors.packageprice?.sedan ? "is-invalid" : ""
                }`}
                id="validationCustom2"
                type="number"
                step="0.1"
                {...register("packageprice.sedan", { required: true })}
              />
              {errors.packageprice?.sedan && (
                <span className="error-message">
                  {t("Please Enter Vehicle Price", {
                    vehicleType: "Sedan",
                  })}
                </span>
              )}
            </div>
          </FormGroup>
          <FormGroup className="row">
            <label className="col-xl-3 col-md-4">
              <span>*</span>{" "}
              {t("Vehicle Price", {
                vehicleType: "Pickup",
              })}
            </label>
            <div className="col-xl-8 col-md-7">
              <input
                placeholder={t("Enter Vehicle Price", {
                  vehicleType: "Pickup",
                })}
                className={`form-control ${
                  errors.packageprice?.pickup ? "is-invalid" : ""
                }`}
                id="validationCustom3"
                type="number"
                step="0.1"
                {...register("packageprice.pickup", { required: true })}
              />
              {errors.packageprice?.pickup && (
                <span className="error-message">
                  {t("Please Enter Vehicle Price", {
                    vehicleType: "Pickup",
                  })}
                </span>
              )}
            </div>
          </FormGroup>
          <FormGroup className="row">
            <label className="col-xl-3 col-md-4">
              <span>*</span>{" "}
              {t("Vehicle Price", {
                vehicleType: "Bike",
              })}
            </label>
            <div className="col-xl-8 col-md-7">
              <input
                placeholder={t("Enter Vehicle Price", { vehicleType: "Bike" })}
                className={`form-control ${
                  errors.packageprice?.bike ? "is-invalid" : ""
                }`}
                id="validationCustom4"
                type="number"
                step="0.1"
                {...register("packageprice.bike", { required: true })}
              />
              {errors.packageprice?.bike && (
                <span className="error-message">
                  {t("Please Enter Vehicle Price", {
                    vehicleType: "Bike",
                  })}
                </span>
              )}
            </div>
          </FormGroup>
          <FormGroup className="row">
            <label className="col-xl-3 col-md-4">
              <span>*</span> {t("Package duration")}
            </label>
            <div className="col-xl-8 col-md-7">
              <input
                placeholder={t("Enter package duration")}
                className={`form-control ${
                  errors.packageduration ? "is-invalid" : ""
                }`}
                id="validationCustom0"
                type="number"
                {...register("packageduration", { required: true })}
              />
              {errors.packageduration && (
                <span className="error-message">
                  {errors.packageduration.message}
                </span>
              )}
            </div>
          </FormGroup>
          <FormGroup className="row">
            <h5>{t("Features")} : </h5>
            <label className="col-xl-3 col-md-4">
              <span>*</span> {t("Package Features")}
            </label>
            <div className="col-xl-8 col-md-7">
              <textarea
                placeholder={t("Enter package features")}
                className={`form-control ${
                  errors.packagefeatures ? "is-invalid" : ""
                }`}
                id="validationCustom5"
                type="text"
                {...register("packagefeatures", { required: true })}
              />
              {errors.packagefeatures && (
                <span className="error-message">
                  {t("Please enter the package features")}
                </span>
              )}
            </div>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">
            {t("common:submit")}
          </Button>
        </ModalFooter>
      </form>
    </Fragment>
  );
}

export default PackageForm;
