import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import { Eye, EyeOff } from "react-feather";

import Breadcrumb from "../common/breadcrumb";
import { sendRequest } from "../../helper/sendRequest";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({});

  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const admin_email = localStorage.getItem("admin_email");

  const handleChangePassword = (formData) => {
    // TODO: Implement password change logic here
    // formData.current_password contains the old password
    // formData.new_password contains the new password

    const API_URL = `${process.env.REACT_APP_BASE_URL}/api/auth/reset-password`;
    sendRequest({
      url: API_URL,
      method: "POST",
      body: {
        email: admin_email,
        currentPassword: formData.current_password,
        newPassword: formData.new_password,
      },
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword((prevShowPassword) => !prevShowPassword);
  };

  const new_password = watch("new_password", ""); // Get the value of the new_password field

  return (
    <Fragment>
      <Breadcrumb title="Settings" parent="Settings" />
      <Container fluid={true}>
        <Row>
          <Col xl="8">
            <Card className="profile-card">
              <CardBody>
                <h4>Reset Password</h4>
                <p>{admin_email}</p>
                <form onSubmit={handleSubmit(handleChangePassword)}>
                  <FormGroup>
                    <label
                      htmlFor="current_password"
                      className="col-form-label"
                    >
                      Current Password:
                    </label>
                    <InputGroup>
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        id="current_password"
                        className={`form-control ${
                          errors.current_password ? "is-invalid" : ""
                        }`}
                        {...register("current_password", {
                          required: "Please enter your current password.",
                        })}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText
                          onClick={toggleCurrentPasswordVisibility}
                        >
                          {showCurrentPassword ? <EyeOff /> : <Eye />}
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {errors.current_password && (
                      <span className="error-message">
                        {errors.current_password.message}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="new_password" className="col-form-label">
                      New Password:
                    </label>
                    <InputGroup>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="new_password"
                        className={`form-control ${
                          errors.new_password ? "is-invalid" : ""
                        }`}
                        {...register("new_password", {
                          required: "Please enter a new password.",
                          minLength: {
                            value: 8,
                            message:
                              "Password must be at least 8 characters long.",
                          },
                        })}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText onClick={togglePasswordVisibility}>
                          {showPassword ? <EyeOff /> : <Eye />}
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {errors.new_password && (
                      <span className="error-message">
                        {errors.new_password.message}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <label
                      htmlFor="confirm_password"
                      className="col-form-label"
                    >
                      Confirm New Password:
                    </label>
                    <InputGroup>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirm_password"
                        className={`form-control ${
                          errors.confirm_password ? "is-invalid" : ""
                        }`}
                        {...register("confirm_password", {
                          required: "Please confirm the new password.",
                          validate: (value) =>
                            value === new_password || "Passwords do not match.",
                        })}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText onClick={togglePasswordVisibility}>
                          {showPassword ? <EyeOff /> : <Eye />}
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {errors.confirm_password && (
                      <span className="error-message">
                        {errors.confirm_password.message}
                      </span>
                    )}
                  </FormGroup>
                  <Button type="submit" color="primary">
                    Change Password
                  </Button>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ChangePassword;
