import { useState } from "react";
import { BsFillCalendarMonthFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";

function DayBarItem({ title, date, id, isToday }) {
  return (
    <>
      {isToday ? (
        <Link to="/">
          <div
            className={
              Object.keys(useParams()).length > 0
                ? "col-12 text-center text-light day-bar-item w-50 mx-auto mb-4"
                : "col-12 text-center text-light day-bar-item w-50 mx-auto bg-dark mb-4"
            }
          >
            Today
          </div>
        </Link>
      ) : (
        <Link to={`/activity/${id}`}>
          <div className="col-12 text-center text-light day-bar-item w-50 mx-auto">
            {date} {/* - {title} */}
          </div>
        </Link>
      )}
    </>
  );
}

export default DayBarItem;
