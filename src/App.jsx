import { useState } from "react";
import DayNavigator from "./components/DayNavigator";
import TaskTable from "./components/TasksTable";
import DayBarItem from "./components/DayBarItem";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import "./App.css";

function App() {
  const [today, setToday] = useState("");
  const [days, setDays] = useState([]);

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

  const { loading, error, data } = useQuery(DAYS, {
    onCompleted: (queryData) => {
      setDays(queryData.getDays);
    },
  });
  console.log(days);
  return (
    <div className="App">
      <div className="d-flex home-page-container">
        <div className="day-bar text-light d-none d-md-block col-3">
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

        <div className="d-flex flex-column col-10 mx-auto">
          <DayNavigator today={today} />
          <TaskTable today={today} />
        </div>
      </div>
    </div>
  );
}

export default App;
