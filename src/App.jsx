import { useState } from "react";
import DayNavigator from "./components/DayNavigator";
import TaskTable from "./components/TasksTable";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="">
        <DayNavigator />
        <TaskTable />
      </div>
    </div>
  );
}

export default App;
