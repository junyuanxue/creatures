import { Collector, Creature } from "./models";
import { prepareBattle, getCapturedCreature } from "./helpers";

const attack = (attacker: Creature, target: Creature) => {
  if (
    attacker.species.family.hasSuperPower &&
    attacker.species.family.id !== target.species.family.id
  ) {
    target.healthPoints = 0;
  } else {
    target.healthPoints -= attacker.combatPoints;
  }
};

const fight = (thisCreature: Creature, thatCreature: Creature) => {
  const firstAttacker = Math.random() < 0.5 ? thisCreature : thatCreature;

  let attacker = firstAttacker;

  while (thisCreature.healthPoints > 0 && thatCreature.healthPoints > 0) {
    const target =
      thisCreature.id === attacker.id ? thatCreature : thisCreature;

    attack(attacker, target);

    // Switch turns
    attacker = target;
  }

  return thisCreature.healthPoints > 0 ? thisCreature : thatCreature;
};

export const pickContestant = (collector: Collector, creature: Creature) =>
  getCapturedCreature({ collectorId: collector.id, creatureId: creature.id })
    ?.creature;

export const battle = (thisCreature?: Creature, thatCreature?: Creature) => {
  if (!thisCreature || !thatCreature) {
    console.log("One of the creatures does not exist 👻");

    return null;
  }

  try {
    prepareBattle(thisCreature, thatCreature);

    return fight(thisCreature, thatCreature);
  } catch (e) {
    console.log(e);

    return null;
  }
};
