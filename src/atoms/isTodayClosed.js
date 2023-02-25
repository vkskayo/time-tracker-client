import { atom } from "recoil";

export const isTodayClosed = atom({
  key: "isTodayClosed", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
