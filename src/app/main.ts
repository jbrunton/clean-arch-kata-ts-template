import { hideBin } from "yargs/helpers";
import { greetCommand } from "./commands/greet";
import { rollCommand } from "./commands/roll";
import yargs from "yargs";

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
