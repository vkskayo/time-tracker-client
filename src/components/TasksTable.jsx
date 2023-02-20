import { useState } from "react";
import Task from "./Task";

function TaskTable({ today }) {
  // achar array de tasks associadas ao day -> TaskArray

  return (
    <div className="d-flex flex-column align-items-center col-12 col-md-8 mx-auto">
      <Task />
      <Task />
      <Task />

      {/* 
          TaskArray.map((task)=>{
            return <Task id={task.id} />
          })
        */}
    </div>
  );
}

export default TaskTable;
