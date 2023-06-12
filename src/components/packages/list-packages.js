import React, { Fragment, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listUser";
import Datatable from "./datatable";
import { Button, Card, CardBody, CardHeader, Container } from "reactstrap";
import withDataFetching from "../../hoc/withDataFetching";
import PackageModal from "./package-modal";
import { sendRequest } from "../../helper/sendRequest";

const List_pacakges = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);

  const newData = data.packages.reverse().map((row) => ({
    "Package name": row.packagename,
    "SUV price": `${row.packageprice?.suv} KWD`,
    "Sedan price": `${row.packageprice?.sedan} KWD`,
    "Pickup price": `${row.packageprice?.pickup} KWD`,
    "Bike price": `${row.packageprice?.bike} KWD`,
    id: row._id,
  }));

  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);

  const handleCreatePackage = async (data) => {
    const API_URL = `${process.env.REACT_APP_BASE_URL}/api/wash-packages/wash-package`;

    const newPackageData = {
      packagename: data.packagename,
      packageprice: data.packageprice,
      packagefeatures: data.packagefeatures.split(","),
    };

    await sendRequest({
      url: API_URL,
      method: "POST",
      body: newPackageData,
    });

    handleCloseModal();
  };

  return (
    <Fragment>
      <Breadcrumb title="Packages List" parent="Packages" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>Packages</h5>
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
                Add Package
              </Button>
              <PackageModal
                onSubmit={handleCreatePackage}
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

const API_URL = `${process.env.REACT_APP_BASE_URL}/api/wash-packages/allpackages`;

export default withDataFetching(API_URL)(List_pacakges);
