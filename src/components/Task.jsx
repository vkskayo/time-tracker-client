import { useEffect, useState } from "react";
import { GiPlayButton } from "react-icons/gi";
import { BsStopFill } from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";
import { gql, useMutation } from "@apollo/client";
import { isTodayClosed } from "../atoms/isTodayClosed";
import { useRecoilValue, useRecoilState } from "recoil";
import { accumulatedTodayWorkTime } from "../atoms/accumulatedTodayWorkTime";

function Task({ id, title, description, hoursWorked, startedHour, isStarted }) {
  const [started, setStarted] = useState(isStarted);
  const [startedHourState, setStartedHourState] = useState(startedHour);
  const isClosed = useRecoilValue(isTodayClosed);
  const [todayWorkTime, setTodayWorkTime] = useRecoilState(
    accumulatedTodayWorkTime
  );

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
    setStarted(true);
    updateTask({
      variables: {
        id: id,
        taskUpdateInput: {
          startedHour: new Date().getTime().toString(),
          isStarted: true,
        },
      },
    });
    setStartedHourState(new Date().getTime().toString());

    // Fazer um update na task, atualizando no banco de dados a hora da última vez que a tarefa foi inicializada
    // Faço a diferença do horario atual com o horario calculado acima e somo com as horas trabalhadas na tarefa do banco de dados
    // O ultimo valor calculado nada mais é que a quantidade de tempo trabalhado na tarefa em tempo real
    // Provavelmente a colocarei em uma variavel de estado que vai estar sendo constantemente calculada(a cada 1 minuto)
    //Depois só colocar no frontend pro usuario
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
    });
    // Calculo o horario em que a tarefa foi pausada
    // Utilizado o horario da ultima vez que a tarefa foi iniciada, faço a diferença do horario que a tarefa foi pausada e o horario
    //que a tarefa foi iniciada pela ultima vez
    // Soma esta diferença no atributo da quantidade de horas trabalhadas na tarefa
  }

  function calculateTaskTime(startHour) {
    if (startHour == "null") {
      return "0";
    }

    const difference =
      new Date().getTime() - startHour + hoursWorked * 60 * 1000;
    return (difference / (1000 * 60)).toString();
  }

  useEffect(() => {
    if (started) {
      var interval = setInterval(() => {
        setTimeOfWork(calculateTaskTime(startedHourState));
        setTodayWorkTime(todayWorkTime + 1);
      }, 60000);
    }

    return () => clearInterval(interval);
  }, [started]);

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
