import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listUser";
import Datatable from "./datatable";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import withDataFetching from "../../hoc/withDataFetching";
import moment from "moment/moment";

const List_bookings = ({ data }) => {
  const newData = data.reverse().booking.map((row) => ({
    "Full name": `${row.firstname} ${row.lastname}`,
    "Phone number": row.phonenumber,
    "Agent name": row.AgentInfo[0]?.agentname || "Not assigned",
    Area: row.area,
    "Booking date": moment(row.bookingDateTime).format("ddd, MMM D, h:mm A"),
    id: row._id,
  }));
  return (
    <Fragment>
      <Breadcrumb title="Bookings List" parent="Bookings" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>Bookings</h5>
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
