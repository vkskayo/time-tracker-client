import { useState } from "react";
import DayBar from "../components/DayBar";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

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

  console.log(day);

  return (
    <div className="d-flex">
      <DayBar />
      <div className="mx-auto d-flex flex-column gap-3 my-4">
        <h2 className="text-light">{day.date}</h2>
        <h3 className="text-light">{day.title}</h3>
        <p className="text-light">{day.description}</p>
      </div>
    </div>
  );
}

export default Day;
