import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";

export const increaseBookCount = async (userId: string) => {
  try {
    const result = await db
      .update(users)
      .set({ bookCount: sql`${users.bookCount} + 1` })
      .where(eq(users.id, userId));
    return result;
  } catch (err) {
    if (err instanceof Error) console.log(err.stack);
  }
};

export default increaseBookCount;
