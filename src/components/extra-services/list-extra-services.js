import React, { Fragment, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listUser";
import Datatable from "./datatable";
import { Button, Card, CardBody, CardHeader, Container } from "reactstrap";
import withDataFetching from "../../hoc/withDataFetching";
import { sendRequest } from "../../helper/sendRequest";
import ExtraServicesModal from "./extra-services-modal";

const List_extraServices = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);

  const newData = data.extraservices.map((row) => ({
    "Extra service name": row.extraservices,
    id: row._id,
  }));

  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);

  const handleCreateExtraService = async (data) => {
    const API_URL = `${process.env.REACT_APP_BASE_URL}/api/extra-services/extra-service`;

    const newExtraServiceData = {
      extraservices: data.extraservices,
    };

    await sendRequest({
      url: API_URL,
      method: "POST",
      body: newExtraServiceData,
    });

    handleCloseModal();
  };
  return (
    <Fragment>
      <Breadcrumb title="Extra Services List" parent="Extra Services" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>Extra Services</h5>
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
                Add Extra Service
              </Button>
              <ExtraServicesModal
                onSubmit={handleCreateExtraService}
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

const API_URL = `${process.env.REACT_APP_BASE_URL}/api/extra-services/allextraservices`;

export default withDataFetching(API_URL)(List_extraServices);
