import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

function DisplayTasks({ date }) {
  const [taskArr, setTaskArr] = useState([]);

  const GET_DAY = gql`
    query Query($date: String!) {
      getTasksByDay(date: $date) {
        id
        title
        description
        hoursWorked
        belongedDay
        startedHour
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_DAY, {
    variables: {
      date: date,
    },
    onCompleted: (queryData) => {
      setTaskArr(queryData.getTasksByDay);
    },
  });

  return (
    <div className="d-flex flex-wrap gap-5 col-8 justify-content-center align-items-center mx-auto my-5">
      {taskArr.map((task) => {
        return (
          <>
            <div className="bg-secondary mx-auto border rounded task-container d-flex flex-column align-items-center p-3 gap-4">
              <h4>{task.title}</h4>
              <p className="text-light gap-4">{task.description}</p>
              <h5>
                Duration:{" "}
                <span>{`${Math.floor(task.hoursWorked / 60)}h ${Math.floor(
                  task.hoursWorked - Math.floor(task.hoursWorked / 60) * 60
                )}m ${Math.round(
                  (task.hoursWorked -
                    Math.floor(task.hoursWorked / 60) * 60 -
                    Math.floor(
                      task.hoursWorked - Math.floor(task.hoursWorked / 60) * 60
                    )) *
                    60
                )}s`}</span>
              </h5>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default DisplayTasks;
