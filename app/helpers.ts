import { Creature, Collector, Position } from "./models";
import { CAPTURES } from "./store";

import { NEARBY_RANGE, CAPTURE_TIME_BUFFER_IN_MS } from "./constants";

const getDistance = (here: Position, there: Position) =>
  Math.hypot(here.x - there.x, here.y - there.y);

const isNearby = (here: Position, there: Position) => {
  const distance = getDistance(here, there);

  return distance < NEARBY_RANGE;
};

export const getCapturedCreature = ({
  collectorId,
  creatureId,
}: {
  collectorId: string;
  creatureId: string;
}) =>
  CAPTURES.find(
    ({ collector, creature }) =>
      collector.id === collectorId && creature.id === creatureId
  );

const hasDuplicateCapture = ({
  collectorId,
  creatureId,
}: {
  collectorId: string;
  creatureId: string;
}) => {
  return !!getCapturedCreature({ collectorId, creatureId });
};

const isTooLate = (creatureId: string) => {
  const existingCapture = CAPTURES.find(
    ({ creature }) => creature.id === creatureId
  );

  if (!existingCapture) {
    return false;
  }

  // Some sort of time 'allowance' in case a ton of collectors are capturing the same creature at the same time
  return existingCapture.timestamp + CAPTURE_TIME_BUFFER_IN_MS < Date.now();
};

export const canCapture = (collector: Collector, creature: Creature) => {
  return (
    isNearby(collector.position, creature.position) &&
    !hasDuplicateCapture({
      collectorId: collector.id,
      creatureId: creature.id,
    }) &&
    !isTooLate(creature.id)
  );
};

export const prepareBattle = (
  thisCreature: Creature,
  thatCreature: Creature
) => {
  if (thisCreature.healthPoints <= 0 || thatCreature.healthPoints <= 0) {
    throw "One of the creatures is already knocked out 😬";
  }
};
