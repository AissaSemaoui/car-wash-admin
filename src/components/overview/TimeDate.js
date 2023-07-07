"use client";

import React, { Fragment, useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Breadcrumb, Card, CardBody, CardHeader, Container } from "reactstrap";

import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { sendRequest } from "../../helper/sendRequest";
import withDataFetching from "../../hoc/withDataFetching";
import { Button } from "@mantine/core";

const TIMES = { from: 9, numberOfHours: 8 };

const AgentsCard = ({
  agent,
  agentId,
  selectedAgentId,
  setFormData,
  packages = [],
  selectedHour,
  setSelectedHour,
  selectedPackageId,
}) => {
  const selectNewAgentId = () => {
    if (selectedAgentId !== agentId)
      setFormData((prev) => ({
        ...prev,
        selectedAgentId: agentId,
      }));
  };

  const selectPackageId = (packageId) => {
    setFormData((prev) => ({
      ...prev,
      selectedPackageId: packageId,
    }));
  };

  return (
    <div key={agentId} className="agent__card">
      <div className="mini__card--wrapper">
        <div className="mini__card">{agent?.agentname}</div>
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

            const matchingBooking = agent.bookings.find(
              (booking) =>
                moment.utc(booking.bookingDateTime).format("HH:mm") === hour
            );

            const isMatchingHour = !!matchingBooking;

            const labelHour = `${startHour
              .toString()
              .padStart(2, "0")}:00 - ${endHour
              .toString()
              .padStart(2, "0")}:00`;

            return (
              <Button
                variant="outline"
                key={labelHour}
                className={`overview-btn ${
                  isMatchingHour
                    ? `${matchingBooking?.bookingthings[0]?.packagename?.toLowerCase()}`
                    : ""
                } ${selectedHour === hour ? "overview-btn--current" : ""}`}
                onClick={() => {
                  if (!isMatchingHour) {
                    setSelectedHour(hour);
                    selectNewAgentId();
                  }
                }}
              >
                {labelHour}
              </Button>
            );
          })}
        </div>
      </div>
      <div className="booking__packages">
        <label className="card__label">Packages : </label>
        <div className="packages__wrapper">
          {packages.map((pack) => (
            <Button
              variant="outline"
              key={pack._id}
              onClick={() => selectPackageId(pack._id)}
              className={`overview-btn ${pack?.packagename?.toLowerCase()} ${
                selectedPackageId === pack?._id ? `package--current` : ""
              }`}
            >
              {pack.packagename}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

function TimeDate({
  data: { packages },
  selectedPackageId,
  scheduledDate,
  selectedAgentId,
  setFormData,
}) {
  const [selectedHour, setSelectedHour] = useState(scheduledDate?.hour);
  const [selectedDay, setSelectedDay] = useState(
    scheduledDate?.date ? new Date(scheduledDate?.date) : new Date()
  );
  const [agentsData, setAgentsData] = useState({});

  const handleChangeDay = (day) => {
    setSelectedHour("");
    setSelectedDay(day);
  };

  const scheduleDate = () => {
    const date = moment(selectedDay).format("L");

    setFormData((prev) => ({
      ...prev,
      scheduledDate: {
        date,
        hour: selectedHour,
        fullDate: `${date} ${selectedHour} UTC`,
      },
    }));
  };

  useEffect(() => {
    scheduleDate();
  }, [selectedHour, selectedDay]);

  const API_URL = `${process.env.REACT_APP_BASE_URL}/api/booking/allbookings`;

  useEffect(() => {
    sendRequest({
      url: API_URL,
      method: "POST",
      body: {
        selectedDay: `${moment(selectedDay).format("L")} UTC`,
      },
      allowNotifications: false,
    }).then((res) => setAgentsData(res?.bookingsPerAgent));
  }, [selectedDay]);

  const agentsDataArray = Object.entries(agentsData);

  return (
    <Fragment>
      <div className="d-flex gap-4 flex-wrap">
        <div className="calendar__wrapper">
          <Calendar
            value={selectedDay}
            onChange={handleChangeDay}
            className="mb-3"
          />
          <div className="calendar__show">
            {moment(selectedDay).format("DD, MMM YYYY")}
          </div>
        </div>
        <div className="agents__card--wrapper">
          {agentsDataArray.map(([agentId, agent]) => (
            <AgentsCard
              setSelectedHour={setSelectedHour}
              selectedHour={selectedAgentId === agentId ? selectedHour : ""}
              agent={agent}
              agentId={agentId}
              selectedPackageId={selectedPackageId}
              selectedAgentId={selectedAgentId}
              setFormData={setFormData}
              packages={packages}
              key={agentId}
            />
          ))}
          {agentsDataArray?.length === 0 && <h3>No Booking Found</h3>}
        </div>
      </div>
    </Fragment>
  );
}

const API_URL = `${process.env.REACT_APP_BASE_URL}/api/wash-packages/allpackages`;

export default withDataFetching(API_URL)(TimeDate);
