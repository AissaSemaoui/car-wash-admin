import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import Datatable from "./datatable";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import withDataFetching from "../../hoc/withDataFetching";
import moment from "moment/moment";
import { useTranslation } from "react-i18next";

const List_bookings = ({ data }) => {
  const { t } = useTranslation("bookings");

  const newData = data.booking.reverse().map((row) => ({
    [t("common:fullName")]: `${row.firstname} ${row.lastname}`,
    [t("common:phoneNumber")]: row.phonenumber,
    [t("common:agentName")]: row.AgentInfo?.agentname || "Not assigned",
    [t("Area")]: `${row.area}, ${row.block}`,
    [t("Booking date")]: moment
      .utc(row.bookingDateTime)
      .format("ddd, MMM D, h:mm A"),
    id: row._id,
  }));
  return (
    <Fragment>
      <Breadcrumb title={t("Bookings List")} parent={t("Bookings")} />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>{t("Bookings")}</h5>
          </CardHeader>
          <CardBody>
            <div className="clearfix"></div>
            <div
              id="batchDelete"
              className="category-table user-list order-table coupon-list-delete"
            >
              <Datatable
                multiSelectOption={false}
                myData={newData || []}
                pageSize={10}
                pagination={true}
                class="-striped -highlight"
              />
            </div>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

const API_URL = `${process.env.REACT_APP_BASE_URL}/api/booking/allbookings`;

export default withDataFetching(API_URL)(List_bookings);
