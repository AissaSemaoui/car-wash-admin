import React, { Fragment } from "react";
import { Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { useDataFetching } from "../../hooks/useDataFetching";
import { sendRequest } from "../../helper/sendRequest";

function BookingForm({ bookingId }) {
  const API_URL = `${process.env.REACT_APP_BASE_URL}/api/available-agents/${bookingId}`;
  const { data: AgentsList, isLoading } = useDataFetching(API_URL);

  return (
    <Fragment>
      <Form>
        <FormGroup>
          <Label htmlFor="agent" className="col-form-label">
            Assign Booking to Agent
          </Label>
          {isLoading ? (
            <Spinner />
          ) : (
            <Input
              type="select"
              id="agent"
              className="form-control"
              onChange={(e) => {
                const selectedAgent = AgentsList?.availableAgents?.find(
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
              {AgentsList?.availableAgents?.map((agent) => (
                <option key={agent._id} value={agent.agentname}>
                  {agent.agentname}
                </option>
              ))}
            </Input>
          )}
        </FormGroup>
      </Form>
    </Fragment>
  );
}

export default BookingForm;
