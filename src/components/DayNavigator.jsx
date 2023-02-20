import { useState, useEffect } from "react";
import { GiCancel } from "react-icons/gi";
import { GiConfirmed } from "react-icons/gi";
import { VscDebugStart } from "react-icons/vsc";
import { FcCalendar } from "react-icons/fc";
import { FiMoreHorizontal } from "react-icons/fi";
import React from "react";

function DayNavigator({ today }) {
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleString());

  /*   useEffect(() => {
    setInterval(() => {
      setCurrentDate(new Date().toLocaleString());
    }, 1000);
  }, []); */

  return (
    <div className="d-flex flex-column my-3 justify-content-center align-items-center gap-2">
      <div className="d-flex justify-content-between col-12 col-md-8">
        <div className="d-flex gap-5">
          <VscDebugStart color="white" size={40} />
          <h3 className="">Day title</h3>
        </div>
        <div className="d-flex gap-4 align-items-center">
          <h3>Today</h3>
          {/*   <h4>{currentDate}</h4> */}
          {/*  <Moment>{dateToFormat}</Moment> */}
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
