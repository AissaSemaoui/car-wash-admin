import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

function ExtraServicesModal({ open, onCloseModal, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Modal isOpen={open} toggle={onCloseModal}>
      <ModalHeader toggle={onCloseModal}>
        <h5 className="modal-title f-w-600" id="exampleModalLabel2">
          Create New Extra Service
        </h5>
      </ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <FormGroup>
            <label htmlFor="extraservices" className="col-form-label">
              Service Name:
            </label>
            <input
              type="text"
              id="extraservices"
              className={`form-control ${
                errors.extraservices ? "is-invalid" : ""
              }`}
              {...register("extraservices", {
                required: "Service name is required.",
              })}
            />
            {errors.extraservices && (
              <span className="invalid-feedback">
                {errors.extraservices.message}
              </span>
            )}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

export default ExtraServicesModal;
