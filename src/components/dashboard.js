import React, { Fragment } from "react";
import Breadcrumb from "./common/breadcrumb";
import CountUp from "react-countup";

import { Card, CardBody, Col, Container, Media, Row } from "reactstrap";
import withDataFetching from "../hoc/withDataFetching";

const Dashboard = ({ data: { data } }) => {
  return (
    <Fragment>
      <Breadcrumb title="Dashboard" parent="Dashboard" />
      <Container fluid={true}>
        <Row>
          <Col xl="3 xl-50" md="6">
            <Card className=" o-hidden widget-cards">
              <CardBody className="bg-warning">
                <Media className="static-top-widget row">
                  <Media body className="col-8">
                    <span className="m-0">Total Bookings</span>
                    <h3 className="mb-0">
                      <CountUp className="counter" end={data?.totalBookings} />
                      <small> This Month</small>
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className=" o-hidden  widget-cards">
              <CardBody className="bg-secondary ">
                <Media className="static-top-widget row">
                  <Media body className="col-8">
                    <span className="m-0">Total Earnings</span>
                    <h3 className="mb-0">
                      KWD{" "}
                      <CountUp className="counter" end={data?.totalEarnings} />
                      <small> This Month</small>
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className="o-hidden widget-cards">
              <CardBody className="bg-primary">
                <Media className="static-top-widget row">
                  <Media body className="col-8">
                    <span className="m-0">Total Agents</span>
                    <h3 className="mb-0">
                      <CountUp className="counter" end={data.totalAgents} />
                      <small> This Month</small>
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className=" o-hidden widget-cards">
              <CardBody className="bg-danger ">
                <Media className="static-top-widget row">
                  <Media body className="col-8">
                    <span className="m-0">Total Workers</span>
                    <h3 className="mb-0">
                      <CountUp className="counter" end={data.totalStaff} />
                      <small> This Month</small>
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl="3 xl-50" md="6">
            <Card className=" o-hidden widget-cards">
              <CardBody className="bg-warning">
                <Media className="static-top-widget row">
                  <Media body className="col-8">
                    <span className="m-0">Bookings Last Month</span>
                    <h3 className="mb-0">
                      {" "}
                      <CountUp
                        className="counter"
                        end={data?.monthly?.monthlyBookings}
                      />
                      <small> Last 30 days</small>
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className=" o-hidden  widget-cards">
              <CardBody className="bg-secondary ">
                <Media className="static-top-widget row">
                  <Media body className="col-8">
                    <span className="m-0">Earnings Last Month</span>
                    <h3 className="mb-0">
                      KWD{" "}
                      <CountUp
                        className="counter"
                        end={data?.monthly?.monthlyEarnings}
                      />
                      <small> Last 30 days</small>
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className="o-hidden widget-cards">
              <CardBody className="bg-primary">
                <Media className="static-top-widget row">
                  <Media body className="col-8">
                    <span className="m-0">Bookings Last 3 months</span>
                    <h3 className="mb-0">
                      <CountUp
                        className="counter"
                        end={data?.threeMonths?.threeMonthsBookings}
                      />
                      <small> Last 3 Months</small>
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className=" o-hidden widget-cards">
              <CardBody className="bg-danger ">
                <Media className="static-top-widget row">
                  <Media body className="col-8">
                    <span className="m-0">Earnings Last 3 Months</span>
                    <h3 className="mb-0">
                      KWD{" "}
                      <CountUp
                        className="counter"
                        end={data?.threeMonths?.threeMonthsEarnings}
                      />
                      <small> Last 3 Months</small>
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className="o-hidden widget-cards">
              <CardBody className="bg-primary">
                <Media className="static-top-widget row">
                  <Media body className="col-8">
                    <span className="m-0">Bookings Last Year</span>
                    <h3 className="mb-0">
                      <CountUp
                        className="counter"
                        end={data?.yearly?.yearlyBookings}
                      />
                      <small> Last Year</small>
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className=" o-hidden widget-cards">
              <CardBody className="bg-danger ">
                <Media className="static-top-widget row">
                  <Media body className="col-8">
                    <span className="m-0">Earnings Last Year</span>
                    <h3 className="mb-0">
                      KWD{" "}
                      <CountUp
                        className="counter"
                        end={data?.yearly?.yearlyEarnings}
                      />
                      <small> Last Year</small>
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

const API_URL = `${process.env.REACT_APP_BASE_URL}/api/reports/reports`;

export default withDataFetching(API_URL)(Dashboard);
