"use client";
import React, { useContext } from "react";
import { ChildContext } from "@/contexts/childContext";
import { useSession } from "next-auth/react";
import StoryBook from "@/components/StoryBook";
import { useQuery } from "@tanstack/react-query";
import getBedtimeStory from "@/server/getBedtimeStory";
import { AnimatePresence, motion } from "framer-motion";

export default function StoryComponent({ content }: any) {
  const { name, age, gender, story } = useContext(ChildContext);
  const { data: session } = useSession();

  const enableQuery = story.length > 30 && !!name && !!age && !!gender;

  const getAIPrompt = () => {
    if (enableQuery) {
      return `generate ${story}. The main character is: ${name}, age: ${age}, gender: ${gender}. Here are the rules: 1. it must be a 370 word bedtime fairy tale. 2. Each different section should have a prompt at the end for novita-sdk to generate an image. 3. The prompt MUST begin with the phrase Generate an image`;
    }
    return "";
  };

  const queryOptions = {
    prompt: getAIPrompt(),
  };

  const { data, isFetched } = useQuery({
    queryKey: ["bedtimeStory"],
    queryFn: () => getBedtimeStory(queryOptions),
    initialData: content,
    enabled: enableQuery,
  });

  return (
    <AnimatePresence>
      {!isFetched && (
        <motion.div
          className="m-auto"
          key="loading-screen"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}>
          Loading...
        </motion.div>
      )}
      {isFetched && (
        <motion.div
          className="w-full"
          key="story-book-screen"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}>
          <StoryBook content={data?.data.data.choices[0].message.content} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
