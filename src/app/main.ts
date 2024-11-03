import { getGreeting } from "usecases/greet";
import yargs, { Argv, CommandModule } from "yargs";
import { hideBin } from "yargs/helpers";
import { StrictArguments, StrictCommandType } from "./commands/types";
import { rollDice } from "usecases/roll";

const greetBuilder = (yargs: Argv) =>
  yargs
    .positional("name", {
      type: "string",
      demandOption: true,
    })
    .options({
      greeting: {
        alias: "g",
        type: "string",
        desc: 'A template for the greeting, e.g. "Hello, :subject!"',
      },
    });

const greetCommand: StrictCommandType<typeof greetBuilder> = {
  command: "greet [name]",
  describe: "the name of the person/subject to greet",
  builder: greetBuilder,
  handler: (args) => {
    const greeting = getGreeting({ name: args.name }, args.greeting);
    console.info(greeting);
  },
};

type RollArgs = {
  number: number;
  seed: string;
  diceSize: number;
};

const rollCommand: CommandModule<object, RollArgs> = {
  command: "roll",
  describe: "simulate a dice roll",
  builder: {
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
  },
  handler(args: StrictArguments<RollArgs>) {
    const rolls = rollDice({
      seed: args.seed,
      diceSize: args.diceSize,
      rolls: args.number,
    });

    console.info(rolls.join(", "));
  },
};

const program = yargs(hideBin(process.argv))
  .command(greetCommand)
  .command(rollCommand);

const main = async () => {
  await program.parseAsync();
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
