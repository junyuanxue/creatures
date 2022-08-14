import { Capture } from "./models";

export const CAPTURES: Capture[] = [];

export const emptyCaptures = () => {
  while (CAPTURES.length) {
    CAPTURES.pop();
  }
};
