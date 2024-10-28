import { times } from "remeda";
import seedrandom from "seedrandom";

type RollParams = {
  seed?: string;
  diceSize: number;
  rolls: number;
};

export const rollDice = ({ seed, diceSize, rolls }: RollParams) => {
  const prng = seedrandom(seed);
  const rollOnce = () => Math.floor(prng() * diceSize);
  return times(rolls, rollOnce);
};
