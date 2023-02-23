import { useState, useEffect } from "react";
import { GiCancel } from "react-icons/gi";
import { GiConfirmed } from "react-icons/gi";
import { VscDebugStart } from "react-icons/vsc";
import { FcCalendar } from "react-icons/fc";
import { FiMoreHorizontal } from "react-icons/fi";
import { gql, useMutation } from "@apollo/client";
import React from "react";

function DayNavigator({ today }) {
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleString());

  const START_DAY = gql`
    mutation Mutation($dayInput: DayInput) {
      createDay(dayInput: $dayInput) {
        id
        title
        description
        hoursWorked
        date
      }
    }
  `;

  const [startDay, { data, loading, error }] = useMutation(START_DAY);

  function handleDayInitialization(e) {
    e.preventDefault();
    startDay({
      variables: {
        dayInput: {
          title: "First mutation in frontend",
          description: "description",
          date: "22/02/2023",
        },
      },
    });
  }

  useEffect(() => {
    // I have to know if today was initialized or not, and store this information whenever this component mounts.
  }, []);

  return (
    <div className="d-flex flex-column my-3 justify-content-center align-items-center gap-2">
      <div className="d-flex justify-content-between col-12 col-md-8">
        <div className="d-flex gap-5">
          <VscDebugStart
            onClick={handleDayInitialization}
            color="white"
            size={40}
          />
          <h3 className="">Day title</h3>
        </div>
        <div className="d-flex gap-4 align-items-center">
          <h3>Today</h3>
          <FcCalendar size={40} />
        </div>
      </div>
      <div className="d-flex flex-column col-12 col-md-8 border p-4 day-box">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column align-items-start">
            <p>Total Hours :</p>
            <h4>0</h4>
          </div>
          <FiMoreHorizontal color="white" size={30} />
        </div>
        <p>To be finished yet...</p>
      </div>
    </div>
  );
}

export default DayNavigator;
