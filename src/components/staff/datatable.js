import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Input } from "reactstrap";
import { sendRequest } from "../../helper/sendRequest";
import { useDataFetching } from "../../hooks/useDataFetching";

const Datatable = ({ myData, myClass, multiSelectOption, pagination }) => {
  const [checkedValues, setCheckedValues] = useState([]);
  const [data, setData] = useState(myData);

  const API_URL = `${process.env.REACT_APP_BASE_URL}/api/agents/allagents?select=agentname,_id}`;

  const { data: AgentsList, isLoading } = useDataFetching(API_URL);

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

  const handleDelete = async (index) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      const del = data;

      const API_URL = `${process.env.REACT_APP_BASE_URL}/api/staff/${data[index]?.id}`;

      const response = await sendRequest({ url: API_URL, method: "DELETE" });

      if (!response?.success) return;

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
    name: <b>Change Agent Supervisor</b>,
    header: <b>Change Agent Supervisor</b>,
    selector: (row) =>
      isLoading ? (
        <option>Loading... </option>
      ) : (
        <Input
          type="select"
          id="agent"
          className={`form-control`}
          onChange={(e) => {
            const selectedAgent = AgentsList?.agents?.find(
              (agent) => agent.agentname === e.target.value
            );
            const API_URL = `${process.env.REACT_APP_BASE_URL}/api/assign-staff/${row.id}`;
            if (selectedAgent)
              sendRequest({
                url: API_URL,
                method: "POST",
                body: {
                  agentId: selectedAgent._id,
                },
              });
          }}
        >
          <option value="">--- change agent ---</option>
          {AgentsList?.agents?.map((agent) => (
            <option key={agent._id} value={agent.agentname}>
              {agent.agentname}
            </option>
          ))}
        </Input>
      ),
  });

  columns.push({
    name: <b>More details</b>,
    header: <b>More details</b>,
    selector: (row) => (
      <span>
        <Link to={`/staff-list/${row.id}`}>
          <Button>More Details</Button>
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
            if (window.confirm("Are you sure you wish to delete this item?"))
              handleRemoveRow();
          }}
        >
          Delete
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
      name: <b>Action</b>,
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
