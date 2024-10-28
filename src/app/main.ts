import { Command } from "commander";
import { getGreeting } from "usecases/greet";

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
  .command("goodbye")
  .argument(
    "[name]",
    "the name of the person/subject to say goodbye to",
    "World",
  )
  .action((name) => {
    const greeting = getGreeting({ name }, "Goodbye, :subject.");
    console.info(greeting);
  });

const main = async () => {
  await program.parseAsync();
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
