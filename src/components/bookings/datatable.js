import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "reactstrap";

const Datatable = ({ myData, myClass, multiSelectOption, pagination }) => {
  const [data, setData] = useState(myData);

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
    name: <b>More details</b>,
    header: <b>More details</b>,
    selector: (row) => (
      <span>
        <Link to={`/bookings-list/${row.id}`}>
          {" "}
          <Button>More Details</Button>
        </Link>
      </span>
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
