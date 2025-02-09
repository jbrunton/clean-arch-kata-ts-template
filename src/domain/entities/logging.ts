import { IO } from "fp-ts/lib/IO";

export type Logger = (s: unknown) => IO<void>;
