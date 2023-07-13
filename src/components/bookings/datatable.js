import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import { Trash2 } from "react-feather";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "reactstrap";
import { sendRequest } from "../../helper/sendRequest";
import { useTranslation } from "react-i18next";

const Datatable = ({ myData, myClass, multiSelectOption, pagination }) => {
  const { t } = useTranslation("bookings");

  const [data, setData] = useState(myData);

  const handleDelete = async (index) => {
    if (window.confirm("Are you sure you wish to delete this booking?")) {
      const del = data;

      const API_URL = `${process.env.REACT_APP_BASE_URL}/api/booking/${data[index]?.id}`;
      const response = await sendRequest({ url: API_URL, method: "DELETE" });

      if (!response?.success) return;

      del.splice(index, 1);
      setData([...del]);
    }
  };

  const renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          data[cellInfo.index][cellInfo.index.id] = e.target.innerHTML;
          setData({ myData: data });
        }}
        dangerouslySetInnerHTML={{
          __html: myData[cellInfo.index][cellInfo.index.id],
        }}
      />
    );
  };

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const columns = [];
  for (const key in myData[0]) {
    let editable = renderEditable;

    if (key === "id") continue;

    columns.push({
      name: <b>{Capitalize(key.toString())}</b>,
      header: <b>{Capitalize(key.toString())}</b>,
      selector: (row) => row[key],
      Cell: editable,
      style: {
        textAlign: "center",
      },
    });
  }

  columns.push({
    name: <b>{t("common:moreDetails")}</b>,
    header: <b>{t("common:moreDetails")}</b>,
    selector: (row) => (
      <span>
        <Link to={`/bookings-list/${row.id}`}>
          <Button>{t("common:moreDetails")}</Button>
        </Link>
      </span>
    ),
  });

  columns.push({
    name: <b>{t("common:action")}</b>,
    id: "action",
    accessor: (str) => "action",
    cell: (row, index) => (
      <div>
        <span onClick={() => handleDelete(index)}>
          <i
            className="fa fa-trash"
            style={{
              width: 35,
              fontSize: 20,
              padding: 11,
              color: "#e4566e",
            }}
          ></i>
        </span>
      </div>
    ),
  });

  return (
    <div>
      <Fragment>
        <DataTable
          data={data}
          columns={columns}
          className={myClass}
          pagination={pagination}
          striped={true}
          center={true}
        />
      </Fragment>
    </div>
  );
};

export default Datatable;
