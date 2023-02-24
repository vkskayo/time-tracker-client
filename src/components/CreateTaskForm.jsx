import { useState, useEffect } from "react";
import { BsFillCalendarMonthFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";

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
  const [isTodayInitialized, setIsTodayInitialized] = useState(false);

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
      }
    }
  `;

  const {} = useQuery(GET_TODAY, {
    variables: {
      date: formattedToday,
    },
    onCompleted: (queryData) => {
      setIsTodayInitialized(queryData.getDayByDate);
    },
  });

  const [createTask, { data, loading, error }] = useMutation(CREATE_TASK);

  function handleTaskCreation(e) {
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
    });
  }

  return (
    <>
      {isTodayInitialized ? (
        <div className="mb-5">
          <input onChange={(e) => setTitle(e.target.value)} value={title} />
          <input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <button onClick={handleTaskCreation}>Create task</button>
        </div>
      ) : null}
    </>
  );
}

export default CreateTaskForm;
