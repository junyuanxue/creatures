export const TOTAL_HEALTH_POINTS = 100;

export enum FamilyName {
  Flyer = "flyer",
  Swimmer = "swimmer",
  Runner = "runner",
  Amphibian = "amphibian",
}

export const FAMILY_COMBAT_POINTS = {
  [FamilyName.Amphibian]: 70,
  [FamilyName.Flyer]: 30,
  [FamilyName.Swimmer]: 20,
  [FamilyName.Runner]: 10,
};

export const NEARBY_RANGE = 3;
export const CAPTURE_TIME_BUFFER_IN_MS = 500;
