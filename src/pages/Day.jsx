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

  return (
    <div className="d-flex">
      <DayBar />
      <h1 className="text-light">asdlk</h1>
    </div>
  );
}

export default Day;
