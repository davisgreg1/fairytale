import { db } from "@/server/db";
import { users, fairyTales } from "@/server/db/schema";

export const updateFairyTaleContent = async (userId: string, data: string) => {
  try {
    const result = await db
      .insert(fairyTales)
      .values({
        userId: userId,
        title: "",
        content: data,
        createdAt: new Date(),
      })
      .onDuplicateKeyUpdate({
        set: {
          userId: userId,
          title: "",
          content: data,
          createdAt: new Date(),
        },
      });

    return result;
  } catch (err) {
    if (err instanceof Error) console.log(err.stack);
  }
};

export default updateFairyTaleContent;
