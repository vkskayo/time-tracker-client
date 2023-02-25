import { atom } from "recoil";

export const isTodayStateInitialized = atom({
  key: "isTodayStateInitialized", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
