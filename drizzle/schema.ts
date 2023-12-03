import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, varchar, int, timestamp } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const account = mysqlTable("account", {
	userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
	type: varchar("type", { length: 255 }).notNull(),
	provider: varchar("provider", { length: 255 }).notNull(),
	providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
	refreshToken: varchar("refresh_token", { length: 255 }),
	accessToken: varchar("access_token", { length: 255 }),
	expiresAt: int("expires_at"),
	tokenType: varchar("token_type", { length: 255 }),
	scope: varchar("scope", { length: 255 }),
	idToken: varchar("id_token", { length: 2048 }),
	sessionState: varchar("session_state", { length: 255 }),
},
(table) => {
	return {
		accountProviderProviderAccountIdPk: primaryKey({ columns: [table.provider, table.providerAccountId], name: "account_provider_providerAccountId_pk"}),
	}
});

export const session = mysqlTable("session", {
	sessionToken: varchar("sessionToken", { length: 255 }).notNull(),
	id: bigint("id", { mode: "number", unsigned: true }),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
});

export const user = mysqlTable("user", {
	id: bigint("id", { mode: "number", unsigned: true }).notNull(),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }).notNull(),
	emailVerified: timestamp("emailVerified", { fsp: 3, mode: 'string' }).defaultNow(),
	image: varchar("image", { length: 255 }),
});

export const verificationToken = mysqlTable("verificationToken", {
	identifier: varchar("identifier", { length: 255 }).notNull(),
	token: varchar("token", { length: 255 }).notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		verificationTokenIdentifierTokenPk: primaryKey({ columns: [table.identifier, table.token], name: "verificationToken_identifier_token_pk"}),
	}
});