import { useState } from "react";
import DayBar from "../components/DayBar";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

function Day() {
  const [today, setToday] = useState("");
  const [day, setDay] = useState([]);

  const DAYS = gql`
    query {
      getDays {
        id
        title
        description
        hoursWorked
        date
      }
    }
  `;

  /*   const { loading, error, data } = useQuery(DAYS, {
    onCompleted: (queryData) => {
      setDays(queryData.getDays);
    },
  });
  console.log(days); */
  return (
    <div className="">
      <DayBar />
    </div>
  );
}

export default Day;
