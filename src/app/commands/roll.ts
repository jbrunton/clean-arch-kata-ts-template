import { Argv } from "yargs";
import { StrictCommandType } from "./types";
import { random, rollDice } from "usecases/roll";

const builder = (yargs: Argv) =>
  yargs.options({
    number: {
      alias: "n",
      type: "number",
      desc: "the number of dice rolls",
      default: 1,
    },
    "dice-size": {
      alias: "d",
      type: "number",
      desc: "the number of sides on the dice",
      default: 6,
    },
    seed: {
      alias: "s",
      type: "string",
      desc: "seed for the PRNG",
    },
  });

export const rollCommand: StrictCommandType<typeof builder> = {
  command: "roll",
  describe: "simulate a dice roll",
  builder,
  handler(args) {
    const rollWithPrng = rollDice({
      diceSize: args.diceSize,
      rolls: args.number,
    })(random(args.seed));

    console.info(rollWithPrng());
  },
};
