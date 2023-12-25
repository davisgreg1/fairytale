import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";

type MethodType = "inc" | "dec";

export const updateFreeStoriesRemaining = async (
  method: MethodType,
  userId?: string,
) => {
  try {
    if (!userId) {
      return;
    }
    if (method === "inc") {
      const result = await db
        .update(users)
        .set({
          freeStoriesRemaining: sql`${users.freeStoriesRemaining} + 1`,
        })
        .where(eq(users.id, userId));
      return result;
    } else {
      const result = await db
        .update(users)
        .set({
          freeStoriesRemaining: sql`${users.freeStoriesRemaining} - 1`,
        })
        .where(eq(users.id, userId));
      return result;
    }
  } catch (err) {
    console.log(
      "GREG LOOK!  ~ file: updateFreeStoriesRemaining.tsx:25 ~ err:",
      err,
    );
    if (err instanceof Error) console.log(err.stack);
  }
};

export default updateFreeStoriesRemaining;
