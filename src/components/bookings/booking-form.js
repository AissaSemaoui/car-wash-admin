import React, { Fragment } from "react";
import { Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { useDataFetching } from "../../hooks/useDataFetching";
import { sendRequest } from "../../helper/sendRequest";
import { useTranslation } from "react-i18next";

function BookingForm({ bookingId }) {
  const { t } = useTranslation("bookings");

  // const API_URL = `${process.env.REACT_APP_BASE_URL}/api/available-agents/${bookingId}`;
  const API_URL = `${process.env.REACT_APP_BASE_URL}/api/agents/allagents?select=agentname,_id}`;
  const { data: AgentsList, isLoading } = useDataFetching(API_URL);

  return (
    <Fragment>
      <Form>
        {isLoading ? (
          <Spinner />
        ) : (
          <FormGroup>
            <Label htmlFor="agent" className="col-form-label">
              {t("Assign Booking to Agent")}
            </Label>
            <Input
              type="select"
              id="agent"
              className="form-control"
              onChange={(e) => {
                const selectedAgent = AgentsList?.agents?.find(
                  (agent) => agent.agentname === e.target.value
                );
                const API_URL = `${process.env.REACT_APP_BASE_URL}/api/booking/${bookingId}`;
                if (selectedAgent)
                  sendRequest({
                    url: API_URL,
                    method: "PUT",
                    body: {
                      agentId: selectedAgent._id,
                    },
                  });
              }}
            >
              <option value=" ">--- change agent ---</option>
              {AgentsList?.agents?.map((agent) => (
                <option key={agent._id} value={agent.agentname}>
                  {agent.agentname}
                </option>
              ))}
            </Input>
          </FormGroup>
        )}
      </Form>
    </Fragment>
  );
}

export default BookingForm;
