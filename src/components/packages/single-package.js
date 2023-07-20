import React, { Fragment, useCallback } from "react";

import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import withDataFetching from "../../hoc/withDataFetching";
import { useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import PackageForm from "./package-form";
import { sendRequest } from "../../helper/sendRequest";
import { useTranslation } from "react-i18next";

const SinglePackage = () => {
  const { t } = useTranslation("packages");

  const { id } = useParams();
  const API_URL = `${process.env.REACT_APP_BASE_URL}/api/wash-packages/${id}`;

  const handleUpdatePackage = (values) => {
    const API_URL = `${process.env.REACT_APP_BASE_URL}/api/wash-packages/${id}`;

    const body = {
      packagename: values.packagename,
      packageprice: values.packageprice,
      packageduration: values.packageduration,
      packagefeatures: values.packagefeatures.split(","),
    };
    sendRequest({
      url: API_URL,
      method: "PUT",
      body,
    });
  };

  const Content = ({ data: { washPackage } }) => (
    <div className="tab-pane fade show active">
      <h5 className="f-w-600 f-16">{t("Package Details")}</h5>
      <div className="table-responsive profile-table">
        <Table className="table-responsive">
          <tbody>
            <tr>
              <td>{t("common:packageName")}:</td>
              <td>{washPackage.packagename}</td>
            </tr>
            <tr>
              <td>{t("Package Prices")}: </td>
              <td>
                <div className="wash-package-price">
                  <span>{t("SUV")}:</span>{" "}
                  <span>
                    <b>{washPackage.packageprice?.suv}</b> KWD
                  </span>
                </div>
                <div className="wash-package-price">
                  <span>{t("Sedan")}:</span>{" "}
                  <span>
                    <b>{washPackage.packageprice?.sedan}</b> KWD
                  </span>
                </div>
                <div className="wash-package-price">
                  <span>{t("Pickup")}:</span>{" "}
                  <span>
                    <b>{washPackage.packageprice?.pickup}</b> KWD
                  </span>
                </div>
                <div className="wash-package-price">
                  <span>{t("Bike")}:</span>{" "}
                  <span>
                    <b>{washPackage.packageprice?.bike}</b> KWD
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>{t("Features")}:</td>
              <td>
                {washPackage?.packagefeatures?.map((feature) => (
                  <div key={feature}>- {feature}</div>
                ))}
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

  const PackageFormWithDValues = useCallback(
    withDataFetching(API_URL)(PackageForm),
    [API_URL]
  );

  return (
    <Fragment>
      <Breadcrumb title="Package Details" parent="Packages List" />
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
                    <PackageFormWithDValues onSubmit={handleUpdatePackage} />
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

export default SinglePackage;
