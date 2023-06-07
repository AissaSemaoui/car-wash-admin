import React, { Fragment } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User, Unlock } from "react-feather";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useForm } from "react-hook-form";
import { sendRequest } from "../../helper/sendRequest";
import { toast } from "react-toastify";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect } from "react";

const LoginTabset = () => {
  const navigate = useNavigate();
  const { isAuthorized, setIsAuthorized } = useAuthContext();

  const clickActive = (event) => {
    document.querySelector(".nav-link").classList.remove("show");
    event.target.classList.add("show");
  };

  const handleLogin = async (values) => {
    try {
      const responseData = await sendRequest({
        url: `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
        method: "POST",
        body: { email: values.email, password: values.password },
      });

      if (!responseData.success) {
        throw new Error("Failed Sign in");
      }

      const { token } = responseData;

      // Store the token in client-side storage (e.g., local storage)
      localStorage.setItem("token", token);

      // Update authentication status in your application
      setIsAuthorized(true);
      // (e.g., set isAuthenticated to true)
    } catch (error) {
      console.error("Login error:", error);
      setIsAuthorized(false);
      toast.error("Failed Sign in, Please try again");
      // Display error message to the user
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const routeChange = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    if (isAuthorized) navigate("/dashboard");
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
                <div className="custom-control custom-checkbox me-sm-2">
                  <Label className="d-block">
                    <Input
                      className="checkbox_animated"
                      id="chk-ani2"
                      type="checkbox"
                    />
                    Reminder Me{" "}
                    <span className="pull-right">
                      {" "}
                      <a href="/#" className="btn btn-default forgot-pass p-0">
                        lost your password
                      </a>
                    </span>
                  </Label>
                </div>
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
