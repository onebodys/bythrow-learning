# byethrow-learning

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.0. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

## Database Sample

Seed the SQLite database and execute the Drizzle + Result demonstration:

```bash
# 1. Seed sample records
bun run db:seed

# 2. Run the Result-wrapped Drizzle demo
bun run db:demo
```
