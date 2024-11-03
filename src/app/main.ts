import { hideBin } from "yargs/helpers";
import { greetCommand } from "./commands/greet";
import { rollCommand } from "./commands/roll";
import yargs from "yargs";
import { db } from "data/db";

const program = yargs(hideBin(process.argv))
  .command(greetCommand)
  .command(rollCommand);

const run = async () => {
  await db.migrate.latest();
  await program.parseAsync();
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.destroy());
