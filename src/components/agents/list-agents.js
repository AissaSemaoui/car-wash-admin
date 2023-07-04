import React, { Fragment, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import Datatable from "./datatable";
import { Button, Card, CardBody, CardHeader, Container } from "reactstrap";
import withDataFetching from "../../hoc/withDataFetching";
import AgentModal from "./agent-modal";
import { sendRequest } from "../../helper/sendRequest";

const List_agents = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);

  const newData = data.agents.reverse().map((row) => ({
    "Agent name": row.agentname,
    "Phone number": row.phonenumber,
    id: row._id,
  }));

  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);

  const handleCreateAgent = async (data) => {
    const API_URL = `${process.env.REACT_APP_BASE_URL}/api/agents/agents`;

    const newAgentData = {
      agentname: data.agentname,
      phonenumber: data.phonenumber,
    };

    await sendRequest({
      url: API_URL,
      method: "POST",
      body: newAgentData,
    });

    handleCloseModal();
  };

  return (
    <Fragment>
      <Breadcrumb title="Cars List" parent="Cars" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>Cars</h5>
          </CardHeader>

          <CardBody>
            <div className="btn-popup pull-right">
              <Button
                type="button"
                color="primary"
                onClick={handleOpenModal}
                data-toggle="modal"
                data-original-title="test"
                data-target="#exampleModal"
              >
                Add Agent
              </Button>
              <AgentModal
                onSubmit={handleCreateAgent}
                open={openModal}
                onCloseModal={handleCloseModal}
              />
            </div>
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

const API_URL = `${process.env.REACT_APP_BASE_URL}/api/agents/allagents`;

export default withDataFetching(API_URL)(List_agents);
