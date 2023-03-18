import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { isTodayClosed } from "../atoms/isTodayClosed";
import { useRecoilState } from "recoil";

function CloseDay() {
  const [day, setDay] = useState([]);
  const [hoursWorked, setHoursWorked] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [closed, setClosed] = useRecoilState(isTodayClosed);

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;

  const GET_TASKS = gql`
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

  const CLOSE_DAY = gql`
    mutation Mutation($date: String!, $dayUpdateInput: DayUpdateInput) {
      updateDay(date: $date, dayUpdateInput: $dayUpdateInput)
    }
  `;

  const {} = useQuery(GET_TASKS, {
    variables: {
      date: formattedToday,
    },
    onCompleted: (queryData) => {
      setHoursWorked(
        queryData.getTasksByDay.reduce(
          (acc, currentTask) =>
            parseFloat(acc) + parseFloat(currentTask.hoursWorked)
        )
      );
      setLoaded(true);
    },
  });

  const [updateDay, { data, loading, error }] = useMutation(CLOSE_DAY);

  function handleDayClosure() {
    updateDay({
      variables: {
        date: formattedToday,
        dayUpdateInput: {
          hoursWorked: hoursWorked,
          closed: true,
        },
      },
    });
    setClosed(true);
  }

  return (
    <>
      {loaded ? (
        <button onClick={handleDayClosure}>End today's activity</button>
      ) : null}
    </>
  );
}

export default CloseDay;
