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
        closed
      }
    }
  `;
  const [days, setDays] = useState([]);
  const [panelSelected, setPanelSelected] = useState("days");

  const { loading, error, data } = useQuery(DAYS, {
    onCompleted: (queryData) => {
      setDays(queryData.getDays);
    },
  });

  const daysPanelStyle = {
    backgroundColor: "rgb(40, 47, 59)",
  };

  return (
    <>
      {!error ? (
        <div className="day-bar text-light d-none d-md-block col-3 pb-5">
          <div className="day-bar-panel d-flex my-3 justify-content-center align-items-center">
            {panelSelected == "days" ? (
              <div
                style={daysPanelStyle}
                className="day-bar-panel-item d-flex justify-content-center align-items-center"
              >
                <p className="text-light panel-text">Days</p>
              </div>
            ) : (
              <div
                onClick={() => setPanelSelected("days")}
                className="day-bar-panel-item d-flex justify-content-center align-items-center"
              >
                <p className="text-light panel-text">Days</p>
              </div>
            )}

            {panelSelected == "analytics" ? (
              <div
                style={daysPanelStyle}
                className="day-bar-panel-item d-flex justify-content-center align-items-center"
              >
                <p className="text-light panel-text">Analytics</p>
              </div>
            ) : (
              <div
                onClick={() => setPanelSelected("analytics")}
                className="day-bar-panel-item d-flex justify-content-center align-items-center"
              >
                <p className="text-light panel-text">Analytics</p>
              </div>
            )}
          </div>

          <DayBarItem isToday={true} />

          {panelSelected == "days"
            ? days.map((day) => {
                if (day.closed) {
                  return (
                    <DayBarItem
                      key={day.id}
                      id={day.id}
                      title={day.title}
                      date={day.date}
                      isToday={false}
                    />
                  );
                }
              })
            : null}
        </div>
      ) : (
        <h3 className="text-center my-5 col-12">The server is down...</h3>
      )}
    </>
  );
}

export default DayBar;
