import { useEffect, useState } from "react";
import Task from "./Task";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { accumulatedTodayWorkTime } from "../atoms/accumulatedTodayWorkTime";
import { useRecoilState, useRecoilValue } from "recoil";
import { todayTasks } from "../atoms/todayTasks";

function TaskTable() {
  const [todayVar, setTodayVar] = useRecoilState(todayTasks);
  const GET_TASKS = gql`
    query Query($date: String!) {
      getTasksByDay(date: $date) {
        id
        title
        description
        hoursWorked
        belongedDay
        startedHour
        isStarted
      }
    }
  `;

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;
  const [hoursWorkedToday, setHoursWorkedToday] = useRecoilState(
    accumulatedTodayWorkTime
  );

  /*   const { loading, error, data } = useQuery(GET_TASKS, {
    variables: {
      date: formattedToday,
    },
    onCompleted: (queryData) => {
      setTodayVar(queryData.getTasksByDay);
      setHoursWorkedToday(
        queryData.getTasksByDay.reduce(
          (accumulator, currentValue) =>
            accumulator + parseFloat(currentValue.hoursWorked),
          0
        )
      );
    },
  }); */

  const [updateTasksByState, { loading, error, data }] = useLazyQuery(
    GET_TASKS,
    {
      onCompleted: (queryData) => {
        setTodayVar(queryData.getTasksByDay);
        setHoursWorkedToday(
          queryData.getTasksByDay.reduce(
            (accumulator, currentValue) =>
              accumulator + parseFloat(currentValue.hoursWorked),
            0
          )
        );
      },
    }
  );

  useEffect(() => {
    updateTasksByState({
      variables: {
        date: formattedToday,
      },
    });
  }, []);

  return (
    <div className="d-flex flex-column align-items-center col-12 col-md-8 mx-auto mb-5 h-100">
      {todayVar.map((task) => {
        return (
          <Task
            title={task.title}
            description={task.description}
            hoursWorked={task.hoursWorked}
            key={task.id}
            id={task.id}
            startedHour={task.startedHour}
            isStarted={task.isStarted}
          />
        );
      })}
    </div>
  );
}

export default TaskTable;
