import { atom } from "recoil";

export const todayTasks = atom({
  key: "todayTasks", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
