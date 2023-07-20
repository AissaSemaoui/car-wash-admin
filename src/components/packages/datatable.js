import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "reactstrap";

const Datatable = ({ myData, myClass, multiSelectOption, pagination }) => {
  const { t } = useTranslation("Packages");

  const [checkedValues, setCheckedValues] = useState([]);
  const [data, setData] = useState(myData);
  const selectRow = (e, i) => {
    if (!e.target.checked) {
      setCheckedValues(checkedValues.filter((item, j) => i !== item));
    } else {
      checkedValues.push(i);
      setCheckedValues(checkedValues);
    }
  };

  const handleRemoveRow = () => {
    const updatedData = myData.filter(function (el) {
      return checkedValues.indexOf(el.id) < 0;
    });
    setData([...updatedData]);
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

  const handleDelete = (index) => {
    if (window.confirm(t("common:deleteItemConfirmation?"))) {
      const del = data;
      del.splice(index, 1);
      setData([...del]);
    }
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
        <Link to={`/packages-list/${row.id}`}>
          <Button>{t("common:moreDetails")}</Button>
        </Link>
      </span>
    ),
  });

  if (multiSelectOption === true) {
    columns.push({
      name: (
        <button
          className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
          onClick={(e) => {
            if (window.confirm(t("common:deleteItemConfirmation?")))
              handleRemoveRow();
          }}
        >
          {t("common:delete")}
        </button>
      ),
      id: "delete",
      accessor: (str) => "delete",
      cell: (row) => (
        <div>
          <span>
            <input
              type="checkbox"
              name={row.id}
              defaultChecked={checkedValues.includes(row.id)}
              onChange={(e) => selectRow(e, row.id)}
            />
          </span>
        </div>
      ),
      style: {
        textAlign: "center",
      },
      sortable: false,
    });
  } else {
    columns.push({
      name: <b>{t("common:action")}</b>,
      id: "delete",
      accessor: (str) => "delete",
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
      style: {
        textAlign: "center",
      },
      sortable: false,
    });
  }
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
