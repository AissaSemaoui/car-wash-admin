import React, { Fragment } from "react";
import LoginTabset from "./loginTabset";
import logo from "../../assets/images/logo.png";
import "../../assets/scss/slick.scss";
import "../../assets/scss/slick-theme.scss";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const Login = () => {
  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="authentication-box">
          <Container>
            <Row>
              <Col className="col-md-5 p-0 card-left">
                <Card className="bg-primary">
                  <div className="svg-icon">
                    <img alt="" src={logo} className="Img-fluid" />
                  </div>
                  <div className="single-item">
                    <div>
                      <h3>Welcome to Q8hand Clean</h3>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col className="col-md-7 p-0 card-right">
                <Card className="tab2-card">
                  <CardBody>
                    <LoginTabset />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
