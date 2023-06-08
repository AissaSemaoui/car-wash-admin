import React, { Fragment } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User } from "react-feather";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect } from "react";
import { useState } from "react";

const LoginTabset = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { isAuthorized, logIn } = useAuthContext();

  const clickActive = (event) => {
    document.querySelector(".nav-link").classList.remove("show");
    event.target.classList.add("show");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (values) => {
    const logInStatus = await logIn(values);

    if (!logInStatus.success) setError(logInStatus.message);
  };

  useEffect(() => {
    if (isAuthorized) navigate("/bookings-list");
  }, [isAuthorized]);

  return (
    <div>
      <Fragment>
        <Tabs>
          <TabList className="nav nav-tabs tab-coupon">
            <Tab className="nav-link" onClick={(e) => clickActive(e)}>
              <User />
              Login
            </Tab>
          </TabList>

          <TabPanel>
            <Form
              onSubmit={handleSubmit(handleLogin)}
              className="form-horizontal auth-form"
            >
              <FormGroup>
                <input
                  name="login[username]"
                  type="email"
                  className="form-control"
                  placeholder="Username"
                  id="exampleInputEmail1"
                  {...register("email", {
                    required: "Please enter your email",
                  })}
                />
              </FormGroup>
              <FormGroup>
                <input
                  name="login[password]"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  {...register("password", {
                    required: "Please enter your password",
                  })}
                />
              </FormGroup>
              <div className="form-terms">
                <span>{error}</span>
              </div>
              <div className="form-button">
                <Button color="primary" type="submit">
                  Login
                </Button>
              </div>
            </Form>
          </TabPanel>
        </Tabs>
      </Fragment>
    </div>
  );
};

export default LoginTabset;
