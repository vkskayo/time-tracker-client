import { useState } from "react";
import Task from "./Task";

function TaskTable() {
  return (
    <div className="App">
      <div className="d-flex flex-column align-items-center col-12 col-md-8 mx-auto">
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  );
}

export default TaskTable;
