import { array, io } from "fp-ts";
import { flow } from "fp-ts/lib/function";
import { IO, sequenceArray } from "fp-ts/lib/IO";

type RollParams = {
  diceSize: number;
  rolls: number;
};

type SingleRoll = IO<number>;
type ManyRolls = IO<readonly number[]>;

/**
 * A program that simulates a single roll of a dice of the given size.
 * @param diceSize The size of the dice
 * @returns {SingleRoll} A random value from the dice in the IO monad.
 */
const rollOnce: (diceSize: number) => (random: number) => SingleRoll =
  (diceSize) => (random) => () =>
    Math.floor(random * diceSize + 1);

/**
 * A program that simulates a number of dice rolls for a dice of the given size.
 * @returns {ManyRolls} An array of random values representing dice rolls in the IO monad.
 */
export const rollDice = ({
  diceSize,
  rolls,
}: RollParams): ((random: IO<number>) => ManyRolls) => {
  return flow(
    (random) => array.replicate(rolls, io.chain(rollOnce(diceSize))(random)),
    sequenceArray,
  );
};
