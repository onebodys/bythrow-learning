# Repository Guidelines

## Overview
This repository exists to study the newer `byethrow` Result-style library (typo `byethorw` in early notes) through concise, runnable scenarios. Each module demonstrates how to drive real-world side-effectful flows declaratively with `byethrow`, surfacing patterns the team can reuse in production code.

## Project Structure & Module Organization
The codebase is a Bun-first TypeScript workspace. `index.ts` is the runnable showcase that wires together the topic-focused modules (`async-operations.ts`, `chaining-operations.ts`, `transforming.ts`, `error-handling.ts`, `errors.ts`, `parse-number.ts`, and `try.ts`). Keep related helpers with their feature module, and favor exporting pure functions so scenarios remain easy to compose. Shared configuration lives at the root (`tsconfig.json`, `biome.json`, `bun.lock`)—update these in the same change when new language features or tooling options are required.

## Build, Test, and Development Commands
- `bun install` — install dependencies recorded in `bun.lock` so everyone exercises the same versions.
- `bun run index.ts` — execute the sample flow; use it to validate new scenarios or logging tweaks.
- `bun run test` — run the `oxlint-tsgolint` static checks; this is our required passing gate before opening a PR. Add new lint rules inside `biome.json` when needed and ensure this command stays green.

## Coding Style & Naming Conventions
Biome enforces tab indentation and double-quoted strings; run `bun run test` or `biome format <file>` before committing if your editor is not already configured. TypeScript modules should default-export the primary learning surface and keep supporting utilities named with a lowerCamelCase verb (for example, `buildErrorMap`). Prefer explicit return types for exported functions and co-locate error schemas in `errors.ts` to centralize handling. Keep imports sorted; Biome’s `organizeImports` assist is enabled. Write every inline code comment in Japanese so learners can follow along easily.

## Testing Guidelines
Static analysis currently serves as the baseline quality gate. When adding behavioral coverage, place tests beside their targets using the `moduleName.test.ts` pattern and always execute them with `bun test`. Target failure paths—throw branches, Zod parsing, and async fallbacks—so tutorials remain trustworthy. Include inline fixtures rather than relying on external assets to keep tests fast. Follow t-wada's test-driven development loop: Red -> Green -> Refactor.

## Commit & Pull Request Guidelines
Past commits (`impl transforming`, `impl async-operations`) show short imperative prefixes; continue with succinct verbs plus the touched module (e.g., `impl parse-number guard`). One feature per commit keeps reviews focused. Pull requests should describe the learning goal, list any new commands/env steps, and attach console output or screenshots for new sample runs. Confirm `bun run test` passes before requesting review, and link issues or discussions when applicable.

## Agent Communication
Agents must maintain an English internal thought process while delivering all external output in Japanese to stay aligned with local documentation practices.

## Reference Materials
The `byethrow` and `@praha/error-factory` packages are still evolving; when questions arise, consult the latest documentation via the MCP server’s `context7` integration before coding so examples remain accurate.

## Development Mindset
Base programming heuristics on the lessons from *Grokking Simplicity*—isolate side effects, keep data transformations pure, and compose behavior declaratively so readers can trace scenarios without incidental complexity.
