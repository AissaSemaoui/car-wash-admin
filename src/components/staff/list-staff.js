import React, { Fragment, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listUser";
import Datatable from "./datatable";
import { Button, Card, CardBody, CardHeader, Container } from "reactstrap";
import withDataFetching from "../../hoc/withDataFetching";
import { sendRequest } from "../../helper/sendRequest";
import StaffModal from "./staff-modal";

const List_staff = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);

  const newData = data.staff.reverse().map((row) => ({
    "Worker name": row.staffname,
    "Phone number": row.phonenumber,
    "Agent supervisor": row?.agentSupervisor?.agentname,
    id: row._id,
  }));

  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);

  const handleCreateStaff = async (data) => {
    const API_URL = `${process.env.REACT_APP_BASE_URL}/api/staff/staff`;

    const newStaffData = {
      staffname: data.staffname,
      phonenumber: data.phonenumber,
      agentSupervisor: null,
    };

    await sendRequest({
      url: API_URL,
      method: "POST",
      body: newStaffData,
    });

    handleCloseModal();
  };

  return (
    <Fragment>
      <Breadcrumb title="Workers List" parent="Workers" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>Workers</h5>
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
                Add Worker
              </Button>
              <StaffModal
                onSubmit={handleCreateStaff}
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

const API_URL = `${process.env.REACT_APP_BASE_URL}/api/staff/allstaff`;

export default withDataFetching(API_URL)(List_staff);
