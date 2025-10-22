import { existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { DATABASE_PATH, db, sqlite } from "../db/client";
import { users } from "../db/schema";

// データベースファイルを置くディレクトリが無い場合は作成してから処理を始める。
const ensureDirectory = () => {
	const targetDir = dirname(DATABASE_PATH);
	if (!existsSync(targetDir)) {
		mkdirSync(targetDir, { recursive: true });
	}
};

// テーブルを初期化して学習用のサンプルデータを流し込む。
const seed = async () => {
	ensureDirectory();

	// 既存テーブルを都度破棄して再作成する。学習用途なので単純な SQL を直接実行する。
	sqlite.exec(`
		DROP TABLE IF EXISTS users;
		CREATE TABLE users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			email TEXT NOT NULL UNIQUE,
			name TEXT NOT NULL
		);
	`);

	// Drizzle の type-safe な INSERT でサンプルレコードを追加する。
	await db.insert(users).values([
		{ email: "shizuka@example.com", name: "Shizuka" },
		{ email: "nobita@example.com", name: "Nobita" },
		{ email: "takeshi@example.com", name: "Takeshi" },
	]);

	console.log("Seed completed.");
};

await seed();
sqlite.close();
