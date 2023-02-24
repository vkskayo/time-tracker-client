import { useState } from "react";
import DayNavigator from "./components/DayNavigator";
import TaskTable from "./components/TasksTable";
import DayBar from "./components/DayBar";
import "./App.css";
import CreateTaskForm from "./components/CreateTaskForm";

function App() {
  const [today, setToday] = useState("");

  return (
    <div className="App">
      <div className="d-flex home-page-container">
        <DayBar />

        <div className="d-flex flex-column col-10 mx-auto">
          <DayNavigator today={today} />
          <CreateTaskForm />
          <TaskTable today={today} />
        </div>
      </div>
    </div>
  );
}

export default App;
