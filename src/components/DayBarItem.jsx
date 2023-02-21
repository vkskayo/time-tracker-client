import { useState } from "react";

function DayBarItem({ title, date, id }) {
  return (
    <div className="col-12 text-center text-light day-bar-item">
      {date} - {title}
    </div>
  );
}

export default DayBarItem;
