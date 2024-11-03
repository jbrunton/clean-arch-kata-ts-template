import { CamelCaseKey } from "yargs";

/**
 * A stricter version of the @types/yargs `ArgumentsCamelCase` type. The `Arguments` and
 * `ArgumentsCamelCase` types allow arbitrary fields. This type allows only those which are
 * explicitly defined.
 */
export type StrictArguments<T = object> = {
  [key in keyof T as key | CamelCaseKey<key>]: T[key];
} & {
  /** Non-option arguments */
  _: Array<string | number>;
  /** The script name or node command */
  $0: string;
};
