import { v4 as uuidv4 } from "uuid";

import {
  FamilyName,
  FAMILY_COMBAT_POINTS,
  TOTAL_HEALTH_POINTS,
} from "./constants";

export class Family {
  id: string;
  name: FamilyName;
  hasSuperPower: boolean;

  constructor(name: FamilyName, hasSuperPower: boolean = false) {
    this.id = uuidv4();
    this.name = name;
    this.hasSuperPower = hasSuperPower;
  }
}

export class Species {
  name: string;
  family: Family;
  combatPoints: number;

  constructor(name: string, family: Family) {
    this.name = name;
    this.family = family;
    this.combatPoints = FAMILY_COMBAT_POINTS[family.name];
  }
}

export class Creature {
  id: string;
  name: string;
  species: Species;
  position: Position;
  combatPoints: number;
  healthPoints: number;

  constructor(name: string, species: Species, position: Position) {
    this.id = uuidv4();
    this.name = name;
    this.species = species;
    this.position = position;
    this.combatPoints = species.combatPoints;
    this.healthPoints = TOTAL_HEALTH_POINTS;
  }
}

export class Collector {
  id: string;
  name: string;
  position: Position;

  constructor(name: string, position: Position) {
    this.id = uuidv4();
    this.name = name;
    this.position = position;
  }
}

export class Capture {
  collector: Collector;
  creature: Creature;
  timestamp: number;

  constructor(collector: Collector, creature: Creature) {
    this.collector = collector;
    this.creature = creature;
    this.timestamp = Date.now();
  }
}

// There are cleverer ways to do it, but you get the gist
type Coordinate = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

// I wanted to use lat long cordinates, but it's a bit complicated
// to calculate distance, so just go with the easiest for now
export class Position {
  x: Coordinate;
  y: Coordinate;

  constructor(x: Coordinate, y: Coordinate) {
    this.x = x;
    this.y = y;
  }
}
