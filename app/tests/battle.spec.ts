import { collectors, creatures } from "./mocks";
import { capture, move } from "../capture";
import { pickContestant, battle } from "../battle";
import { Creature } from "../models";
import { TOTAL_HEALTH_POINTS } from "../constants";

describe("battle", () => {
  const { collector1, collector2 } = collectors;
  const {
    birdCreature,
    sharkCreature,
    lionCreature,
    frogCreature,
    salamanderCreature,
  } = creatures;

  const recover = (creature: Creature) => {
    creature.healthPoints = TOTAL_HEALTH_POINTS;
  };

  beforeAll(() => {
    capture(collector1, birdCreature);
    move(collector1, sharkCreature.position);
    capture(collector1, sharkCreature);

    capture(collector2, frogCreature);
    capture(collector2, lionCreature);
    capture(collector2, salamanderCreature);
  });

  beforeEach(() => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.4);
  });

  afterEach(() => {
    recover(birdCreature);
    recover(sharkCreature);
    recover(lionCreature);
    recover(frogCreature);
    recover(salamanderCreature);

    jest.spyOn(global.Math, "random").mockRestore();
  });

  test("creatures cannot battle if one of them is already knocked out", () => {
    birdCreature.healthPoints = 0;

    const contestant1 = pickContestant(collector1, birdCreature);
    const contestant2 = pickContestant(collector2, frogCreature);
    const winner = battle(contestant1, contestant2);

    expect(winner).toBe(null);
  });

  test("creatures cannot battle if one of them is not capture by their collector", () => {
    const contestant1 = pickContestant(collector1, lionCreature);
    const contestant2 = pickContestant(collector2, frogCreature);
    const winner = battle(contestant1, contestant2);

    expect(winner).toBe(null);
  });

  describe("battle and reveal a winner", () => {
    test("flyers beat runners", () => {
      const contestant1 = pickContestant(collector1, birdCreature);
      const contestant2 = pickContestant(collector2, lionCreature);
      const winner = battle(contestant2, contestant1);

      expect(winner?.id).toBe(birdCreature.id);
    });

    test("flyers beat swimmers", () => {
      const contestant1 = pickContestant(collector1, birdCreature);
      const contestant2 = pickContestant(collector1, sharkCreature);
      const winner = battle(contestant2, contestant1);

      expect(winner?.id).toBe(birdCreature.id);
    });

    test("swimmers beat runners", () => {
      const contestant1 = pickContestant(collector1, sharkCreature);
      const contestant2 = pickContestant(collector2, lionCreature);
      const winner = battle(contestant2, contestant1);

      expect(winner?.id).toBe(sharkCreature.id);
    });

    test("amphibians win over everyone else", () => {
      const contestant1 = pickContestant(collector1, birdCreature);
      const contestant2 = pickContestant(collector2, frogCreature);
      const winner = battle(contestant1, contestant2);

      expect(winner?.id).toBe(frogCreature.id);
    });

    describe("two amphibians battle against each other", () => {
      test("frogCreature wins as first attacker", () => {
        const contestant1 = pickContestant(collector2, frogCreature);
        const contestant2 = pickContestant(collector2, salamanderCreature);
        const winner = battle(contestant1, contestant2);

        expect(winner?.id).toBe(frogCreature.id);
      });

      test("salamanderCreature wins as first attacker", () => {
        const contestant1 = pickContestant(collector2, frogCreature);
        const contestant2 = pickContestant(collector2, salamanderCreature);
        const winner = battle(contestant2, contestant1);

        expect(winner?.id).toBe(salamanderCreature.id);
      });
    });
  });
});
