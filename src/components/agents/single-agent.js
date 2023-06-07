import React, { Fragment, useCallback } from "react";

import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import withDataFetching from "../../hoc/withDataFetching";
import { useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import AgentForm from "./agents-form";
import useRequest from "../../hooks/useRequest";

const SingleAgent = () => {
  const { fetchData, isLoading, response } = useRequest();

  const { id } = useParams();
  const API_URL = `${process.env.REACT_APP_BASE_URL}/api/agents/${id}`;

  const handleUpdatePackage = (values) => {
    const API_URL = `${process.env.REACT_APP_BASE_URL}/api/agents/${id}`;

    const body = {
      agentname: values.agentname,
      phonenumber: values.phonenumber,
    };

    fetchData({
      url: API_URL,
      method: "PUT",
      body,
    });
  };

  const Content = ({ data: { agent } }) => (
    <div className="tab-pane fade show active">
      <h5 className="f-w-600 f-16">Agent Detail</h5>
      <div className="table-responsive profile-table">
        <Table className="table-responsive">
          <tbody>
            <tr>
              <td>Agent Name:</td>
              <td>{agent.agentname}</td>
            </tr>
            <tr>
              <td>Phone Number:</td>
              <td>{agent.phonenumber}</td>
            </tr>
            <tr>
              <td>Assigned Staff:</td>
              {agent.assignedstaff?.length > 0 ? (
                <td>
                  {agent.assignedstaff?.map((staff) => (
                    <div>
                      - {staff.staffname} {staff.phonenumber}
                    </div>
                  ))}
                </td>
              ) : (
                <div>No Assigned Staff</div>
              )}
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
                    <AgentForm onSubmit={handleUpdatePackage} />
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

export default SingleAgent;
