# node-typescript-template

A template repository with a few TypeScript features:

1. Uses `pnpm`.
2. Lints with `eslint` and formats with `prettier`.
3. Git hooks with `husky` and `lint-staged`.
4. Enforces code boundaries with `eslint-plugin-boundaries`.

## The sample app

The sample app is not intended to offer guidance on best practices for organising code. It simply demonstrates some capabilities for a basic CLI app with code and unit tests.

Usage:

```bash
$ pnpm install

$ pnpm cli greet
> Hello, World!

$ pnpm cli roll
> 4
```

Options:

```bash
$ pnpm cli greet Amy
> Hello, Amy!

$ pnpm cli greet 'Le Monde' --greeting 'Bonjour, :subject!'
> Bonjour, Le Monde!

$ pnpm cli roll -n 4 --dice-size 12 --seed abc
> 8, 7, 8, 7
```

## Running tests

```bash
$ pnpm test

# Or, to watch for changes
$ pnpm test:watch
```