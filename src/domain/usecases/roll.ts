import { array, io } from "fp-ts";
import { flow } from "fp-ts/lib/function";
import { IO, sequenceArray } from "fp-ts/lib/IO";
import { ReaderIO } from "fp-ts/lib/ReaderIO";
import seedrandom from "seedrandom";

type RollParams = {
  diceSize: number;
  rolls: number;
};

type RollDie = ReaderIO<number, number>;

export const random: (seed?: string) => IO<number> = (seed) => seedrandom(seed);

const rollOnce: (diceSize: number) => RollDie = (diceSize) => (rand) => () =>
  Math.floor(rand * diceSize + 1);

export const rollDice = ({
  diceSize,
  rolls,
}: RollParams): ((prng: IO<number>) => IO<readonly number[]>) => {
  return flow(
    (r) => array.replicate(rolls, io.chain(rollOnce(diceSize))(r)),
    sequenceArray,
  );
};
