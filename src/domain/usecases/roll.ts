import { array, io } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { IO, sequenceArray } from "fp-ts/lib/IO";
import { ReaderIO } from "fp-ts/lib/ReaderIO";
import seedrandom from "seedrandom";

type RollParams = {
  seed?: string;
  diceSize: number;
  rolls: number;
};

type RollDie = ReaderIO<number, number>;

export const random: (seed?: string) => IO<number> = (seed) => seedrandom(seed);

export const rollOnce: (diceSize: number) => RollDie =
  (diceSize) => (rand) => () =>
    Math.floor(rand * diceSize + 1);

export const rollDice = ({
  seed,
  diceSize,
  rolls,
}: RollParams): IO<readonly number[]> => {
  return pipe(
    random(seed),
    (r) => array.replicate(rolls, io.chain(rollOnce(diceSize))(r)),
    sequenceArray,
  );
};
