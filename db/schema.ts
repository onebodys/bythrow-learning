import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// ユーザー情報を扱うスキーマ。学習用なので必要最小限の列のみ定義する。
export const users = sqliteTable("users", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	email: text("email", { length: 255 }).notNull().unique(),
	name: text("name", { length: 120 }).notNull(),
});

// Drizzle から推論される型をそのままエクスポートして Result パイプラインで利用する。
export type User = typeof users.$inferSelect;
