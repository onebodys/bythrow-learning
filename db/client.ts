import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

export const DATABASE_PATH = "var/data/tutorial.sqlite";

// Bun の組み込み SQLite を利用してローカルファイルに接続する。create: true で初回起動時にファイルを自動作成する。
const sqlite = new Database(DATABASE_PATH, { create: true });

// Drizzle ORM から使うためのラッパー。アプリ全体で共有する。
export const db = drizzle(sqlite);

// テストやスクリプトで直接生クエリを流したい場合に使うため、元の Database も公開しておく。
export { sqlite };
