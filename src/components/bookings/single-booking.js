import React, { Fragment, useCallback } from "react";

import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import withDataFetching from "../../hoc/withDataFetching";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import BookingForm from "./booking-form";
import { useTranslation } from "react-i18next";

const SingleBooking = () => {
  const { t } = useTranslation("bookings");

  const { id } = useParams();
  const API_URL = `${process.env.REACT_APP_BASE_URL}/api/booking/${id}`;

  const Content = ({ data: { booking } }) => (
    <div className="tab-pane fade show active">
      <div className="table-responsive profile-table">
        <Table className="table-responsive">
          <tbody>
            <h5 className="f-w-600 f-16">{t("Customer Info")}</h5>
            <tr>
              <td>{t("common:firstName")}:</td>
              <td>{booking.firstname}</td>
            </tr>
            <tr>
              <td>{t("common:lastName")}:</td>
              <td>{booking.lastname}</td>
            </tr>
            <tr>
              <td>{t("common:phoneNumber")}:</td>
              <td>{booking.phonenumber}</td>
            </tr>
            <tr>
              <td>{t("common:address")}:</td>
              <td>
                {booking.area}, {booking.avenue}, {booking.street},{" "}
                {booking.block}, {booking.house}
              </td>
            </tr>
            <h5 className="f-w-600 f-16">{t("Booking Info")}</h5>
            <tr>
              <td>{t("Vehicle Type")}:</td>
              <td>{booking?.bookingthings[0]?.vehicletype}</td>
            </tr>
            <tr>
              <td>{t("common:packageName")}:</td>
              <td>{booking?.bookingthings[0]?.packagename}</td>
            </tr>
            <tr>
              <td>{t("common:packagePrice")}:</td>
              <td>{booking?.bookingthings[0]?.packageprice} KWD</td>
            </tr>
            {booking?.bookingthings[0]?.extraservicesname && (
              <>
                <tr>
                  <td>{t("common:extraServiceName")}:</td>
                  <td>{booking?.bookingthings[0]?.extraservicesname}</td>
                </tr>
                <tr>
                  <td>{t("common:extraServicePrice")}:</td>
                  <td>
                    {booking?.bookingthings[0]?.extraservicesprice || "/"}
                  </td>
                </tr>
              </>
            )}
            <tr>
              <td>{t("Booking Date")}:</td>
              <td>
                {moment
                  .utc(booking.bookingDateTime)
                  .format("dddd, MMMM Do YYYY, h:mm A")}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <h5 className="f-w-600 f-16">{t("common:agentDetails")}</h5>
      <div className="table-responsive profile-table">
        {!booking?.AgentInfo?.agentname ? (
          <h6>{t("common:noAssignedAgent")}</h6>
        ) : (
          <Table className="table-responsive">
            <tbody>
              <tr>
                <td>{t("common:agentName")}</td>
                <td>{booking.AgentInfo?.agentname}</td>
              </tr>
              <tr>
                <td>{t("common:phoneNumber")}</td>
                <td>{booking.AgentInfo?.agentphonenumber}</td>
              </tr>
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );

  const ContentWithData = useCallback(withDataFetching(API_URL)(Content), [
    API_URL,
  ]);

  return (
    <Fragment>
      <Breadcrumb title="Booking Details" parent="Booking List" />
      <Container fluid={true}>
        <Row>
          <Col xl="8">
            <Card className="profile-card">
              <CardBody>
                <Tabs>
                  <TabList className="nav nav-tabs tab-coupon">
                    <Tab className="nav-link">{t("common:details")}</Tab>
                    <Tab className="nav-link">{t("common:edit")}</Tab>
                  </TabList>
                  <TabPanel>
                    <ContentWithData />
                  </TabPanel>
                  <TabPanel>
                    <BookingForm bookingId={id} />
                  </TabPanel>
                </Tabs>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default SingleBooking;
