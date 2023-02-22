import { useState } from "react";
import { Link } from "react-router-dom";

function DayBarItem({ title, date, id }) {
  return (
    <Link to={`/activity/${id}`}>
      <div className="col-12 text-center text-light day-bar-item">
        {date} - {title}
      </div>
    </Link>
  );
}

export default DayBarItem;
