import {
  int,
  timestamp,
  mysqlTable,
  primaryKey,
  varchar,
  text,
  index,
  uniqueIndex,
} from "drizzle-orm/mysql-core";
import type { AdapterAccount } from "@auth/core/adapters";

const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: varchar("image", { length: 255 }),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
    bookCount: int("bookCount").notNull().default(0),
    freeStoriesRemaining: int("freeStoriesRemaining").notNull().default(3),
    isSubscribed: int("isSubscribed").notNull().default(0), // 0 for not subscribed, 1 for subscribed
  },
  (table) => ({
    nameIdx: index("bookCount_idx").on(table.bookCount),
    emailIdx: uniqueIndex("email_idx").on(table.email),
  }),
);

const accounts = mysqlTable(
  "accounts",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    refresh_token_expires_in: int("refresh_token_expires_in"),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
);

const fairyTales = mysqlTable(
  "fairyTales",
  {
    id: int("id").autoincrement().notNull().primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  },
  (table) => ({
    userFk: varchar("userFk", { length: 255 }).references(() => users.id),
  }),
);

const payments = mysqlTable(
  "payments",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    fairyTaleId: varchar("fairyTaleId", { length: 255 }).notNull(),
    amount: int("amount").notNull(),
    stripePaymentId: varchar("stripePaymentId", { length: 255 }),
    status: varchar("status", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  },
  (table) => ({
    userFk: varchar("userId_fk", { length: 255 }).references(() => users.id),
    fairyTaleFk: varchar("fairyTaleId_fk", { length: 255 }).references(
      () => table.fairyTaleId,
    ),
  }),
);

const sessions = mysqlTable("sessions", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export { users, accounts, sessions, verificationTokens, fairyTales, payments };
