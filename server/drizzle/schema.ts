import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, varchar, int, text, timestamp, index, uniqueIndex } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const accounts = mysqlTable("accounts", {
	userId: varchar("userId", { length: 255 }).notNull(),
	type: varchar("type", { length: 255 }).notNull(),
	provider: varchar("provider", { length: 255 }).notNull(),
	providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
	refreshToken: varchar("refresh_token", { length: 255 }),
	refreshTokenExpiresIn: int("refresh_token_expires_in"),
	accessToken: varchar("access_token", { length: 255 }),
	expiresAt: int("expires_at"),
	tokenType: varchar("token_type", { length: 255 }),
	scope: varchar("scope", { length: 255 }),
	idToken: text("id_token"),
	sessionState: text("session_state"),
},
(table) => {
	return {
		accountsProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId)
	}
});

export const fairyTales = mysqlTable("fairyTales", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	userId: varchar("userId", { length: 255 }).notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	content: text("content").notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).notNull(),
});

export const payments = mysqlTable("payments", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	userId: varchar("userId", { length: 255 }).notNull(),
	fairyTaleId: varchar("fairyTaleId", { length: 255 }).notNull(),
	amount: int("amount").notNull(),
	stripePaymentId: varchar("stripePaymentId", { length: 255 }),
	status: varchar("status", { length: 255 }).notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).notNull(),
});

export const sessions = mysqlTable("sessions", {
	sessionToken: varchar("sessionToken", { length: 255 }).primaryKey().notNull(),
	userId: varchar("userId", { length: 255 }).notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
});

export const users = mysqlTable("users", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }).notNull(),
	emailVerified: timestamp("emailVerified", { mode: 'string' }),
	image: varchar("image", { length: 255 }),
	createdAt: timestamp("createdAt", { mode: 'string' }).notNull(),
	bookCount: int("bookCount").default(0).notNull(),
	freeStoriesRemaining: int("freeStoriesRemaining").default(3).notNull(),
	isSubscribed: int("isSubscribed").default(0).notNull(),
},
(table) => {
	return {
		bookCountIdx: index("bookCount_idx").on(table.bookCount),
		emailIdx: uniqueIndex("email_idx").on(table.email),
	}
});

export const verificationToken = mysqlTable("verificationToken", {
	identifier: varchar("identifier", { length: 255 }).notNull(),
	token: varchar("token", { length: 255 }).notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		verificationTokenIdentifierToken: primaryKey(table.identifier, table.token)
	}
});