import React, { Fragment, useCallback } from "react";

import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import withDataFetching from "../../hoc/withDataFetching";
import { useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import useRequest from "../../hooks/useRequest";
import StaffForm from "./staff-form";

const SingleStaff = () => {
  const { fetchData, isLoading, response } = useRequest();

  const { id } = useParams();
  const API_URL = `${process.env.REACT_APP_BASE_URL}/api/staff/${id}`;

  const handleUpdatePackage = (values) => {
    const API_URL = `${process.env.REACT_APP_BASE_URL}/api/staff/${id}`;

    const body = {
      staffname: values.staffname,
      phonenumber: values.phonenumber,
    };

    fetchData({
      url: API_URL,
      method: "PUT",
      body,
    });
  };

  const Content = ({ data: { staff } }) => (
    <div className="tab-pane fade show active">
      <h5 className="f-w-600 f-16">Worker Detail</h5>
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

  return (
    <Fragment>
      <Breadcrumb title="Booking Detail" parent="Booking List" />
      <Container fluid={true}>
        <Row>
          <Col xl="8">
            <Card className="profile-card">
              <CardBody>
                <Tabs>
                  <TabList className="nav nav-tabs tab-coupon">
                    <Tab className="nav-link">Detail</Tab>
                    <Tab className="nav-link">Edit</Tab>
                  </TabList>
                  <TabPanel>
                    <ContentWithData />
                  </TabPanel>
                  <TabPanel>
                    <StaffForm onSubmit={handleUpdatePackage} />
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
