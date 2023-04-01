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
        <h2 className="text-light my-3">{day.title}</h2>
        <p className="text-light col-6 mx-auto fs-5">{day.description}</p>
        <p className="text-warning d-inline-block mx-auto fs-5 mb-5">
          {day.date}
        </p>
        <h1 className="text-light text-center my-4">Tasks</h1>
        <DisplayTasks date={day.date} />
      </div>
    </div>
  );
}

export default Day;
