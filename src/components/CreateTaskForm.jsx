import { useState, useEffect } from "react";
import { BsFillCalendarMonthFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { isTodayStateInitialized } from "../atoms/isTodayInitialized";
import { isTodayStateInitializedLoading } from "../atoms/isTodayInitializedLoading";
import { isTodayClosed } from "../atoms/isTodayClosed";
import { todayTasks } from "../atoms/todayTasks";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function CreateTaskForm() {
  const [today, setToday] = useState(new Date());
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const formattedToday = dd + "/" + mm + "/" + yyyy;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [belongedDay, setBelongedDay] = useState(formattedToday);
  const [isTodayInitialized, setIsTodayInitialized] = useRecoilState(
    isTodayStateInitialized
  );
  const [isLoading, setIsLoading] = useRecoilState(
    isTodayStateInitializedLoading
  );
  const [isClosed, setIsClosed] = useRecoilState(isTodayClosed);
  const [tasksToday, setTasksToday] = useRecoilState(todayTasks);

  const CREATE_TASK = gql`
    mutation Mutation($taskInput: TaskInput) {
      createTask(taskInput: $taskInput) {
        id
        title
        description
        hoursWorked
        belongedDay
        startedHour
      }
    }
  `;

  const GET_TODAY = gql`
    query GetDayByDate($date: String!) {
      getDayByDate(date: $date) {
        id
        title
        description
        hoursWorked
        date
        closed
      }
    }
  `;

  const {} = useQuery(GET_TODAY, {
    variables: {
      date: formattedToday,
    },
    onCompleted: (queryData) => {
      console.log("test");
      if (queryData.getDayByDate) {
        setIsTodayInitialized(true);
        setIsClosed(queryData.getDayByDate.closed);
      }
      setIsLoading(false);
    },
  });

  const [createTask, { data, loading, error }] = useMutation(CREATE_TASK);

  function handleTaskCreation(e) {
    console.log("test");
    e.preventDefault();
    createTask({
      variables: {
        taskInput: {
          title: title,
          description: description,
          belongedDay: belongedDay,
          startedHour: "null",
        },
      },
    }).then((res) => {
      /*       console.log("test");
      setTasksToday([...tasksToday, res.data.createTask]);
      setTitle("");
      setDescription(""); */
      location.reload();
    });
  }

  return (
    <>
      {isTodayInitialized && !isClosed ? (
        <form onSubmit={handleTaskCreation} className="mb-5">
          <input
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <button type="submit">Create task</button>
        </form>
      ) : null}
    </>
  );
}

export default CreateTaskForm;
