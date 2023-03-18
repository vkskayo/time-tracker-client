import { useEffect, useState } from "react";
import { GiPlayButton } from "react-icons/gi";
import { BsStopFill } from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";
import { gql, useMutation } from "@apollo/client";
import { isTodayClosed } from "../atoms/isTodayClosed";
import { useRecoilValue, useRecoilState } from "recoil";
import { accumulatedTodayWorkTime } from "../atoms/accumulatedTodayWorkTime";
import { todayTasks } from "../atoms/todayTasks";

function Task({ id, title, description, hoursWorked, startedHour, isStarted }) {
  const [started, setStarted] = useState(isStarted);

  const [startedHourState, setStartedHourState] = useState(startedHour);
  const isClosed = useRecoilValue(isTodayClosed);
  const [todayWorkTime, setTodayWorkTime] = useRecoilState(
    accumulatedTodayWorkTime
  );
  const [noTickHours, setNoTickHours] = useState(todayWorkTime);

  const [tickDifference, setTickDifference] = useState(0);

  const [tasksToday, setTasksToday] = useRecoilState(todayTasks);

  const pointing = {
    cursor: "pointer",
  };
  const [timeOfWork, setTimeOfWork] = useState(hoursWorked);

  const UPDATE_TASK = gql`
    mutation Mutation($id: ID!, $taskUpdateInput: TaskUpdateInput) {
      updateTask(ID: $id, taskUpdateInput: $taskUpdateInput) {
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

  const [updateTask, { data, loading, error }] = useMutation(UPDATE_TASK);
  function handleStartTask() {
    setStartedHourState(new Date().getTime().toString());
    setStarted(true);
    updateTask({
      variables: {
        id: id,
        taskUpdateInput: {
          startedHour: new Date().getTime().toString(),
          isStarted: true,
        },
      },
    }).then((res) => {
      setTasksToday(
        tasksToday.map((task) => {
          if (task.id == id) {
            console.log(res.data.updateTask);
            return res.data.updateTask;
          }
          return task;
        })
      );
    });
  }

  function handleStopTask() {
    setStarted(false);
    setTimeOfWork(calculateTaskTime(startedHourState));
    updateTask({
      variables: {
        id: id,
        taskUpdateInput: {
          hoursWorked: calculateTaskTime(startedHourState),
          isStarted: false,
        },
      },
    }).then((res) => {
      setTasksToday(
        tasksToday.map((task) => {
          if (task.id == id) {
            return res.data.updateTask;
          }
          return task;
        })
      );
    });

    /*     setNoTickHours(noTickHours + calculateDifference(startedHourState));
    setTodayWorkTime(noTickHours + calculateDifference(startedHourState)); */
  }

  function calculateTaskTime(startHour) {
    if (startHour == "null") {
      return "0";
    }

    const difference =
      new Date().getTime() - startHour + hoursWorked * 60 * 1000;
    return (difference / (1000 * 60)).toString();
  }

  function calculateDifference(startHour) {
    const difference = (new Date().getTime() - startHour) / (1000 * 60);
    return difference;
  }

  useEffect(() => {
    if (started) {
      setTimeOfWork(calculateTaskTime(startedHourState));

      var interval = setInterval(() => {
        setTimeOfWork(calculateTaskTime(startedHourState));
        setTodayWorkTime(todayWorkTime + calculateDifference(startedHourState));
        setTickDifference(
          tickDifference + calculateDifference(startedHourState)
        );
      }, 60000);
    }

    return () => clearInterval(interval);
  }, [started]);

  useEffect(() => {
    if (started) {
      setTodayWorkTime(todayWorkTime + calculateDifference(startedHourState));
    }
  }, []);

  return (
    <div className="d-flex justify-content-between col-12 border p-2">
      <div className="d-flex gap-4 align-items-center">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
        </div>
        <p>{title}</p>
      </div>
      <div className="d-flex gap-4 align-items-center">
        <p>{`${Math.floor(timeOfWork)}m ${Math.round(
          (timeOfWork - Math.floor(timeOfWork)) * 60
        )}s`}</p>
        {isClosed ? (
          <AiFillLock color="white" size={30} />
        ) : (
          <>
            {!started ? (
              <GiPlayButton
                style={pointing}
                onClick={handleStartTask}
                color="white"
                size={30}
              />
            ) : (
              <BsStopFill
                style={pointing}
                onClick={handleStopTask}
                color="red"
                size={30}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Task;
