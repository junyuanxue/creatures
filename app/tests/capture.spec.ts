import { creatures, collectors, positions } from "./mocks";
import { CAPTURES, emptyCaptures } from "../store";
import { capture, move } from "../capture";
import { Position } from "../models";
import { CAPTURE_TIME_BUFFER_IN_MS } from "../constants";

jest.useFakeTimers();

describe("capture", () => {
  const { collector1, collector2 } = collectors;
  const { birdCreature, sharkCreature, lionCreature, frogCreature } = creatures;

  afterEach(() => {
    emptyCaptures();
    collector1.position = positions.startingPosition1;
    collector2.position = positions.startingPosition2;
  });

  test("collector cannot capture creatures not within range", () => {
    capture(collector1, frogCreature);
    capture(collector1, lionCreature);
    capture(collector1, sharkCreature);
    capture(collector2, birdCreature);
    capture(collector2, sharkCreature);

    expect(CAPTURES).toHaveLength(0);
  });

  test("collector can capture a creature if within range", () => {
    capture(collector1, birdCreature);

    expect(CAPTURES).toHaveLength(1);
    expect(CAPTURES[0].collector.id === collector1.id);
    expect(CAPTURES[0].creature.id === birdCreature.id);

    capture(collector2, frogCreature);

    expect(CAPTURES).toHaveLength(2);
    expect(CAPTURES[1].collector.id === collector2.id);
    expect(CAPTURES[1].creature.id === frogCreature.id);

    move(collector1, new Position(2, 6));
    capture(collector1, sharkCreature);

    expect(CAPTURES).toHaveLength(3);
    expect(CAPTURES[2].collector.id === collector1.id);
    expect(CAPTURES[2].creature.id === sharkCreature.id);
  });

  test("collector cannot capture a creature if someone got there first", () => {
    move(collector2, collector1.position);
    capture(collector1, birdCreature);

    jest.advanceTimersByTime(CAPTURE_TIME_BUFFER_IN_MS + 1);

    capture(collector2, birdCreature);

    expect(CAPTURES).toHaveLength(1);
    expect(CAPTURES[0].collector.id === collector1.id);
    expect(CAPTURES[0].creature.id === birdCreature.id);
  });

  test("collector can only capture the same creature once", () => {
    capture(collector1, birdCreature);
    capture(collector1, birdCreature);

    expect(CAPTURES).toHaveLength(1);
    expect(CAPTURES[0].collector.id === collector1.id);
    expect(CAPTURES[0].creature.id === birdCreature.id);
  });

  test("two collectors can capture a creature (almost) at the same time", () => {
    move(collector2, collector1.position);
    capture(collector1, birdCreature);

    jest.advanceTimersByTime(CAPTURE_TIME_BUFFER_IN_MS);
    capture(collector2, birdCreature);

    expect(CAPTURES).toHaveLength(2);
    expect(CAPTURES[0].collector.id === collector1.id);
    expect(CAPTURES[0].creature.id === birdCreature.id);
    expect(CAPTURES[1].collector.id === collector2.id);
    expect(CAPTURES[1].creature.id === birdCreature.id);
  });
});
