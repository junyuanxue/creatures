import { canCapture } from "./helpers";
import { Creature, Collector, Capture, Position } from "./models";
import { CAPTURES } from "./store";

// Ideally we can pass in moveX or moveY to move by 1
// at a time, but just to simplify things here
export const move = (mover: Collector | Creature, position: Position) => {
  mover.position = position;
};

export const capture = (collector: Collector, creature: Creature) => {
  if (canCapture(collector, creature)) {
    const capture = new Capture(collector, creature);
    CAPTURES.push(capture);
  }
};
