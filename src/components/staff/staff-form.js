import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { FormGroup, Button, ModalBody, ModalFooter } from "reactstrap";

function StaffForm({ data, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data?.staff,
  });

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <FormGroup>
            <label htmlFor="staffname" className="col-form-label">
              Worker Name:
            </label>
            <input
              type="text"
              id="staffname"
              className={`form-control ${errors.staffname ? "is-invalid" : ""}`}
              {...register("staffname", {
                required: "Worker name is required.",
              })}
            />
            {errors.staffname && (
              <span className="error-message">{errors.staffname.message}</span>
            )}
          </FormGroup>
          <FormGroup>
            <label htmlFor="phonenumber" className="col-form-label">
              Phone Number:
            </label>
            <input
              type="text"
              id="phonenumber"
              defaultValue="+965"
              className={`form-control ${
                errors.phonenumber ? "is-invalid" : ""
              }`}
              {...register("phonenumber", {
                required: "Phone number is required.",
                pattern: {
                  value: /^(\+)?\d{1,3}\d{7,14}$/,
                  message:
                    "Please write a vaild Phone number and add your country code.",
                },
              })}
            />
            {errors.phonenumber && (
              <span className="error-message">
                {errors.phonenumber.message}
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
    </Fragment>
  );
}

export default StaffForm;
