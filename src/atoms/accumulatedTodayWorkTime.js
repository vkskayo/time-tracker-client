import { atom } from "recoil";

export const accumulatedTodayWorkTime = atom({
  key: "accumulatedTodayWorkTime", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});
