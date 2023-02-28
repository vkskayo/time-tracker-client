import { useState } from "react";
import { FcCalendar } from "react-icons/fc";
import { FiMoreHorizontal } from "react-icons/fi";
import { gql, useMutation } from "@apollo/client";
import React from "react";
import { isTodayStateInitialized } from "../atoms/isTodayInitialized";
import { isTodayStateInitializedLoading } from "../atoms/isTodayInitializedLoading";
import { useRecoilValue, useRecoilState } from "recoil";
import { RxEyeClosed, RxEyeNone, RxEyeOpen } from "react-icons/rx";
import { accumulatedTodayWorkTime } from "../atoms/accumulatedTodayWorkTime";

function DayNavigator() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;

  const START_DAY = gql`
    mutation Mutation($dayInput: DayInput) {
      createDay(dayInput: $dayInput) {
        id
        title
        description
        hoursWorked
        date
      }
    }
  `;

  const [startDay, { data, loading, error }] = useMutation(START_DAY);
  const [isTodayInitialized, setIsTodayInitialized] = useRecoilState(
    isTodayStateInitialized
  );
  const isLoading = useRecoilValue(isTodayStateInitializedLoading);
  const hoursWorkedToday = useRecoilValue(accumulatedTodayWorkTime);
  const formattedHoursWorkedToday = `${Math.floor(
    hoursWorkedToday / 60
  )}h ${Math.floor(
    hoursWorkedToday - Math.floor(hoursWorkedToday / 60) * 60
  )}m ${Math.round(
    (hoursWorkedToday -
      Math.floor(hoursWorkedToday / 60) * 60 -
      Math.floor(hoursWorkedToday - Math.floor(hoursWorkedToday / 60) * 60)) *
      60
  )}s`;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleDayInitialization(e) {
    e.preventDefault();
    setIsTodayInitialized(true);
    startDay({
      variables: {
        dayInput: {
          title: title,
          description: description,
          date: formattedToday,
        },
      },
    });
  }

  return (
    <>
      {!isLoading ? (
        <div className="d-flex flex-column my-3 justify-content-center align-items-center gap-2">
          <div className="d-flex justify-content-between col-12 col-md-8">
            <div className="d-flex gap-5">
              <h3 className="">Day title</h3>
            </div>
            <div className="d-flex gap-4 align-items-center">
              <h3>Today</h3>
              <FcCalendar size={40} />
            </div>
          </div>
          <div className="d-flex flex-column col-12 col-md-8 p-4 day-box">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column align-items-start">
                <p>Total Hours :</p>
                <h4>{formattedHoursWorkedToday}</h4>
              </div>
              <FiMoreHorizontal color="white" size={30} />
            </div>
            <p>To be finished yet...</p>
            {!isTodayInitialized ? (
              <>
                <form
                  onSubmit={handleDayInitialization}
                  className="mt-5 d-flex flex-column w-50 gap-2"
                >
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Insert a title"
                  />
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-50"
                    required
                    placeholder="Insert a description"
                  />
                  <button className="w-50" type="submit">
                    Start today's activity
                  </button>
                </form>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default DayNavigator;
