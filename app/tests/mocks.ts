import { FamilyName } from "../constants";

import { Family, Species, Creature, Collector, Position } from "../models";

const flyer = new Family(FamilyName.Flyer);
const swimmer = new Family(FamilyName.Swimmer);
const runner = new Family(FamilyName.Runner);
const amphibian = new Family(FamilyName.Amphibian, true);

const bird = new Species("bird", flyer);
const shark = new Species("shark", swimmer);
const lion = new Species("lion", runner);
const frog = new Species("frog", amphibian);
const salamander = new Species("salamander", amphibian);

const birdCreature = new Creature("Birdie", bird, new Position(1, 1));
const sharkCreature = new Creature("Sharkie", shark, new Position(3, 8));
const lionCreature = new Creature("Lionie", lion, new Position(6, 5));
const frogCreature = new Creature("Froggie", frog, new Position(9, 8));
const salamanderCreature = new Creature(
  "Salamanderie",
  salamander,
  new Position(7, 8)
);

const startingPosition1 = new Position(2, 2);
const startingPosition2 = new Position(7, 7);

const collector1 = new Collector("Rick", startingPosition1);
const collector2 = new Collector("Morty", startingPosition2);

export const creatures = {
  birdCreature,
  sharkCreature,
  lionCreature,
  frogCreature,
  salamanderCreature,
};

export const collectors = {
  collector1,
  collector2,
};

export const positions = {
  startingPosition1,
  startingPosition2,
};
