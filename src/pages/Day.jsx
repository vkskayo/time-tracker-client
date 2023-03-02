import { useState } from "react";
import DayBar from "../components/DayBar";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import DisplayTasks from "../components/DisplayTasks";

function Day() {
  const [day, setDay] = useState([]);
  const id = useParams().id;

  const GET_DAY = gql`
    query GetDayById($getDayByIdId: ID!) {
      getDayById(id: $getDayByIdId) {
        id
        title
        description
        hoursWorked
        date
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_DAY, {
    variables: {
      getDayByIdId: id,
    },
    onCompleted: (queryData) => {
      setDay(queryData.getDayById);
    },
  });

  return (
    <div className="d-flex">
      <DayBar />
      <div className="mx-auto d-flex flex-column gap-3 my-4">
        <h2 className="text-light">{day.date}</h2>
        <h3 className="text-light">{day.title}</h3>
        <p className="text-light">{day.description}</p>
        <h1 className="text-light text-center my-4">Tasks</h1>
        <DisplayTasks date={day.date} />
      </div>
    </div>
  );
}

export default Day;
