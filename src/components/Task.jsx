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
  }

  function handleStopTask() {
    setStarted(false);
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
