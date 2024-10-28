import { Command } from "commander";
import { getGreeting } from "usecases/greet";
import { rollDice } from "usecases/roll";

const program = new Command()
  .name("greeter")
  .description("Example CLI command for saying hello");

program
  .command("greet")
  .argument("[name]", "the name of the person/subject to greet", "World")
  .option("-g, --greeting <greeting>", "the greeting to say")
  .action((name, opts) => {
    const greeting = getGreeting({ name }, opts.greeting);
    console.info(greeting);
  });

program
  .command("roll")
  .option(
    "-n, --number <number>",
    "the number of dice rolls",
    (input) => Number.parseInt(input),
    1,
  )
  .option("-s, --seed <string>", "seed for the PRNG")
  .option(
    "-d, --dice-size <number>",
    "the dice size",
    (input) => Number.parseInt(input),
    6,
  )
  .action((opts) => {
    const rolls = rollDice({
      seed: opts.seed,
      diceSize: opts.diceSize,
      rolls: opts.number,
    });

    console.info(rolls.join(", "));
  });

const main = async () => {
  await program.parseAsync();
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
