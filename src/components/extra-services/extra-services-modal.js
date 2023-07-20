import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Button,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

function ExtraServicesModal({ open, onCloseModal, onSubmit }) {
  const { t } = useTranslation("extraServices");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Modal isOpen={open} toggle={onCloseModal}>
      <ModalHeader toggle={onCloseModal}>
        <h5 className="modal-title f-w-600" id="exampleModalLabel2">
          {t("Create New Extra Service")}
        </h5>
      </ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <FormGroup>
            <label htmlFor="extraservices" className="col-form-label">
              {t("Service Name")}:
            </label>
            <input
              type="text"
              id="extraservices"
              className={`form-control ${
                errors.extraservices ? "is-invalid" : ""
              }`}
              {...register("extraservices", {
                required: t("Service Name is required"),
              })}
            />
            {errors.extraservices && (
              <span className="error-message">
                {errors.extraservices.message}
              </span>
            )}
          </FormGroup>
          <FormGroup>
            <label htmlFor="extraservicesprice" className="col-form-label">
              {t("Service Price")}:
            </label>
            <input
              type="number"
              step="0.1"
              id="extraservicesprice"
              className={`form-control ${
                errors.extraservicesprice ? "is-invalid" : ""
              }`}
              {...register("extraservicesprice", {
                required: t("Service Price is required"),
              })}
            />
            {errors.extraservicesprice && (
              <span className="error-message">
                {errors.extraservicesprice.message}
              </span>
            )}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">
            {t("common:submit")}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

export default ExtraServicesModal;
