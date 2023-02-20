import { useState } from "react";
import DayNavigator from "./components/DayNavigator";
import TaskTable from "./components/TasksTable";
import DayBarItem from "./components/DayBarItem";
import "./App.css";

function App() {
  const [today, setToday] = useState("");
  return (
    <div className="App">
      <div className="d-flex">
        <div className="day-bar text-light">
          <h4 className="p-4">Registered Days</h4>
          <DayBarItem />
          <DayBarItem />
          <DayBarItem />
          <DayBarItem />
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
