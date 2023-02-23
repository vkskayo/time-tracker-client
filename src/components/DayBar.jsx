import { useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import DayBarItem from "./DayBarItem";
import { useParams, Link } from "react-router-dom";

function DayBar() {
  const DAYS = gql`
    query {
      getDays {
        id
        title
        description
        hoursWorked
        date
      }
    }
  `;
  const [days, setDays] = useState([]);

  const { loading, error, data } = useQuery(DAYS, {
    onCompleted: (queryData) => {
      setDays(queryData.getDays);
    },
  });

  return (
    <div className="day-bar text-light d-none d-md-block col-3">
      {Object.keys(useParams()).length > 0 ? (
        <Link to="/">
          <button>Today's activity</button>
        </Link>
      ) : null}
      <h4 className="p-4">Registered Days</h4>
      {days.map((day) => {
        return (
          <DayBarItem
            key={day.id}
            id={day.id}
            title={day.title}
            date={day.date}
          />
        );
      })}
    </div>
  );
}

export default DayBar;
