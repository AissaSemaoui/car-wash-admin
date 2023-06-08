import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { FormGroup, Button, ModalBody, ModalFooter } from "reactstrap";

function AgentForm({ data, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data?.agent,
  });

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <FormGroup>
            <label htmlFor="agentname" className="col-form-label">
              Agent Name:
            </label>
            <input
              type="text"
              id="agentname"
              className={`form-control ${errors.agentname ? "is-invalid" : ""}`}
              {...register("agentname", {
                required: "Agent name is required.",
              })}
            />
            {errors.agentname && (
              <span className="invalid-feedback">
                {errors.agentname.message}
              </span>
            )}
          </FormGroup>
          <FormGroup>
            <label htmlFor="phonenumber" className="col-form-label">
              Phone Number:
            </label>
            <input
              type="text"
              id="phonenumber"
              className={`form-control ${
                errors.phonenumber ? "is-invalid" : ""
              }`}
              {...register("phonenumber", {
                required: "Phone number is required.",
                pattern: {
                  value: /^[0-9]{8}$/,
                  message: "Phone number must contain only digits.",
                },
              })}
            />
            {errors.phonenumber && (
              <span className="invalid-feedback">
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

export default AgentForm;
