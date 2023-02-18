import { useState } from "react";
import { GiPlayButton } from "react-icons/gi";
import { BsStopFill } from "react-icons/bs";

function Task() {
  const [started, setStarted] = useState(false);

  function handleStartTask() {
    setStarted(true);

    console.log(
      new Date().getHours().toString() +
        " hours and " +
        new Date().getMinutes().toString() +
        " minutes."
    );

    // Fazer um update na task, atualizando no banco de dados a hora da última vez que a tarefa foi inicializada
    // Faço a diferença do horario atual com o horario calculado acima e somo com as horas trabalhadas na tarefa do banco de dados
    // O ultimo valor calculado nada mais é que a quantidade de tempo trabalhado na tarefa em tempo real
    // Provavelmente a colocarei em uma variavel de estado que vai estar sendo constantemente calculada(a cada 1 minuto)
    //Depois só colocar no frontend pro usuario
  }

  function handleStopTask() {
    setStarted(false);
    // Calculo o horario em que a tarefa foi pausada
    // Utilizado o horario da ultima vez que a tarefa foi iniciada, faço a diferença do horario que a tarefa foi pausada e o horario
    //que a tarefa foi iniciada pela ultima vez
    // Soma esta diferença no atributo da quantidade de horas trabalhadas na tarefa
  }

  return (
    <div className="d-flex justify-content-between col-12 border p-2">
      <div className="d-flex gap-4 align-items-center">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          {/*        <label class="form-check-label" for="flexCheckDefault">
              Default checkbox
            </label> */}
        </div>
        <p>(No description)</p>
      </div>
      <div className="d-flex gap-4 align-items-center">
        <p>0:03 - 1:04</p>
        <p>1 h 01 min</p>
        {!started ? (
          <GiPlayButton onClick={handleStartTask} color="white" size={30} />
        ) : (
          <BsStopFill onClick={handleStopTask} color="red" size={30} />
        )}
      </div>
    </div>
  );
}

export default Task;
