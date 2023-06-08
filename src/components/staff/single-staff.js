import React, { Fragment, useCallback } from "react";

import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import withDataFetching from "../../hoc/withDataFetching";
import { useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import StaffForm from "./staff-form";
import { sendRequest } from "../../helper/sendRequest";

const SingleStaff = () => {
  const { id } = useParams();
  const API_URL = `${process.env.REACT_APP_BASE_URL}/api/staff/${id}`;

  const handleUpdatePackage = (values) => {
    const API_URL = `${process.env.REACT_APP_BASE_URL}/api/staff/${id}`;

    const body = {
      staffname: values.staffname,
      phonenumber: values.phonenumber,
    };

    sendRequest({
      url: API_URL,
      method: "PUT",
      body,
    });
  };

  const Content = ({ data: { staff } }) => (
    <div className="tab-pane fade show active">
      <h5 className="f-w-600 f-16">Worker Details</h5>
      <div className="table-responsive profile-table">
        <Table className="table-responsive">
          <tbody>
            <tr>
              <td>Worker Name:</td>
              <td>{staff.staffname}</td>
            </tr>
            <tr>
              <td>Phone Number:</td>
              <td>{staff.phonenumber}</td>
            </tr>
            <tr>
              <td>Agent Supervisor:</td>
              <td>
                {staff?.agentSupervisor?.agentname || "No Assigned Agent"}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );

  const ContentWithData = useCallback(withDataFetching(API_URL)(Content), [
    API_URL,
  ]);

  const StaffFormWithDValues = useCallback(
    withDataFetching(API_URL)(StaffForm),
    [API_URL]
  );

  return (
    <Fragment>
      <Breadcrumb title="Worker Details" parent="Workers List" />
      <Container fluid={true}>
        <Row>
          <Col xl="8">
            <Card className="profile-card">
              <CardBody>
                <Tabs>
                  <TabList className="nav nav-tabs tab-coupon">
                    <Tab className="nav-link">Details</Tab>
                    <Tab className="nav-link">Edit</Tab>
                  </TabList>
                  <TabPanel>
                    <ContentWithData />
                  </TabPanel>
                  <TabPanel>
                    <StaffFormWithDValues onSubmit={handleUpdatePackage} />
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

export default SingleStaff;
