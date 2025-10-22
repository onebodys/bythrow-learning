import { Result } from "@praha/byethrow";
import { eq } from "drizzle-orm";
import { db } from "./db/client";
import { type User, users } from "./db/schema";

// Drizzle 経由で users テーブルからレコードを 1 件取得する Result パイプライン。
// 取得処理自体は副作用なので Result.try で例外を握りつぶしつつ domain エラーに変換する。
const loadUserByEmail = Result.try({
	try: async (email: string) => {
		const rows = await db.select().from(users).where(eq(users.email, email));

		const user = rows.at(0);
		if (!user) {
			// ここでは plain Error を投げて catch 側へ制御を移す。
			throw new Error("User not found");
		}

		return user;
	},
	catch: (error) =>
		new Error("Failed to load user from SQLite", { cause: error }),
});

// ドメイン向けの整形処理。Result.map で純粋関数を差し込み、副作用境界を増やさない。
const toGreeting = (user: User) => {
	return `${user.name} <${user.email}>`;
};

// 実行例: Shizuka を読み込み、成功時/失敗時それぞれでログを出し分ける。
const demo = async () => {
	const result = await Result.pipe(
		Result.succeed("shizuka@example.com"),
		Result.andThen(loadUserByEmail),
		Result.map(toGreeting),
	);

	if (Result.isSuccess(result)) {
		// 成功時は Drizzle から返ってきたデータを整形してログ出力する。
		console.log("Greeting:", result.value);
	} else {
		// 失敗時は cause 付きでエラーを確認しやすいようにまとめて出力する。
		console.error("Load failed", result.error.message);
		if (result.error.cause) {
			console.error("Cause:", result.error.cause);
		}
	}

	const missing = await Result.pipe(
		Result.succeed("unknown@example.com"),
		Result.andThen(loadUserByEmail),
	);

	if (Result.isFailure(missing)) {
		console.warn("Missing user message:", missing.error.message);
	}
};

await demo();
