import React, { Fragment, useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Breadcrumb, Card, CardBody, CardHeader, Container } from "reactstrap";

import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { sendRequest } from "../../helper/sendRequest";
import withDataFetching from "../../hoc/withDataFetching";

const TIMES = { from: 9, numberOfHours: 8 };

const AgentsCard = ({ agent, packages = [] }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);

  console.log("this is selected Booking : ", selectedBooking);

  console.log(selectedHour);
  return (
    <div key={agent[0]?.bookingDateTime} className="agent__card">
      <div className="mini__card--wrapper">
        <div className="mini__card">{agent[0]?.AgentInfo?.agentname}</div>
      </div>
      <div className="card__hours">
        <label className="card__label">Time : </label>
        <div className="time__wrapper">
          {Array.from({ length: TIMES.numberOfHours }).map((_, i) => {
            let startHour = TIMES.from + i * 2;
            startHour = startHour < 24 ? startHour : startHour - 24;

            let endHour = startHour + 1;
            endHour = endHour < 24 ? endHour : endHour - 24;

            const hour = `${startHour.toString().padStart(2, "0")}:30`;

            const matchingBooking = agent.find(
              (booking) =>
                moment(booking.bookingDateTime).format("HH:mm") === hour
            );

            const isMatchingHour = !!matchingBooking;

            const labelHour = `${startHour
              .toString()
              .padStart(2, "0")}:00 - ${endHour
              .toString()
              .padStart(2, "0")}:00`;

            return (
              <button
                key={labelHour}
                className={`overview-btn ${
                  isMatchingHour
                    ? `${matchingBooking?.bookingthings[0]?.packagename?.toLowerCase()}`
                    : ""
                } ${selectedHour === hour ? "overview-btn--current" : ""}`}
                onClick={() => {
                  setSelectedHour(hour);
                  setSelectedBooking(matchingBooking || null);
                }}
              >
                {labelHour}
              </button>
            );
          })}
        </div>
      </div>
      <div className="booking__packages">
        <label className="card__label">Packages : </label>
        <div className="packages__wrapper">
          {packages.map((pack) => (
            <button
              key={pack._id}
              className={`overview-btn ${pack?.packagename?.toLowerCase()} ${
                selectedBooking?.bookingthings[0]?.packageId === pack._id
                  ? `package--current`
                  : ""
              }`}
            >
              {pack.packagename}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

function Overview({ data: { packages } }) {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [agentsData, setAgentsData] = useState({});

  const API_URL = `${process.env.REACT_APP_BASE_URL}/api/booking/allbookings`;

  useEffect(() => {
    sendRequest({
      url: API_URL,
      method: "POST",
      body: {
        selectedDay,
      },
      allowNotifications: false,
    }).then((res) => setAgentsData(res?.bookingsPerAgent));
  }, [selectedDay]);

  const agentsDataArray = Object.values(agentsData);

  return (
    <Fragment>
      <Breadcrumb title="Overview List" parent="Overview" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>Overview</h5>
          </CardHeader>
          <CardBody className="d-flex gap-4 flex-wrap">
            <div className="calendar__wrapper">
              <Calendar
                value={selectedDay}
                onChange={setSelectedDay}
                className="mb-3"
              />
              <div className="calendar__show">
                {moment(selectedDay).format("DD, MMM YYYY")}
              </div>
            </div>
            <div className="agents__card--wrapper">
              {agentsDataArray.map((agent) => (
                <AgentsCard
                  agent={agent}
                  packages={packages}
                  key={agent[0]?.AgentInfo?.agentId}
                />
              ))}
              {agentsDataArray?.length === 0 && <h3>No Booking Found</h3>}
            </div>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
}

const API_URL = `${process.env.REACT_APP_BASE_URL}/api/wash-packages/allpackages`;

export default withDataFetching(API_URL)(Overview);
