import { atom } from "recoil";

export const intervalCounterState = atom({
  key: "intervalCounterState", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});
