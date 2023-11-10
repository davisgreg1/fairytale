"use client";
import React, { useContext, useState } from "react";
import { localStorage } from "@/utils/localStorage";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ChildContext } from "@/contexts/childContext";
import getBedtimeStory from "@/server/getBedtimeStory";
import getImages from "@/utils/getImages";
import StoryBook from "@/components/StoryBook";
import LoadingAnimation from "@/components/LoadingAnimation";

export default function StoryComponent() {
  const aiPageDataFromLocalStorage = localStorage.getItem(
    "aiPageData",
  ) as string;
  const parsedAiPageDataFromLocalStorage = aiPageDataFromLocalStorage
    ? JSON.parse(aiPageDataFromLocalStorage)
    : [];
  const { name, age, gender, story } = useContext(ChildContext);
  const [isBedtimeStoryFetched, setIsBedtimeStoryFetched] = useState(false);

  const enableQuery = true;

  const getAIPrompt = () => {
    if (enableQuery) {
      return `generate ${story}. The main character is: ${name}, age: ${age}, gender: ${gender}. Here are the rules: 1. it MUST be a 470 word bedtime fairy tale. 2.It MUST include a title and an image for the book 3.The generated image MUST come after the title 4. Each different section should have a prompt at the end for novita-sdk to generate an image. 5. The prompt MUST begin with the phrase Generate an image`;
    }
    return "";
  };

  const queryOptions = {
    prompt: getAIPrompt(),
  };

  const {
    data: storyData,
    isFetched,
    status,
  } = useQuery({
    queryKey: ["bedtimeStory"],
    queryFn: async () => {
      const data = await getBedtimeStory(queryOptions);
      setIsBedtimeStoryFetched(true);
      return data;
    },
    enabled: parsedAiPageDataFromLocalStorage.length === 0,
    staleTime: Infinity,
    select: (data) => {
      const storyPages = data?.data.split("\n\n");

      let pageData = [];
      const titleAndImagedata = storyPages?.splice(0, 2);
      pageData.push({
        title: titleAndImagedata[0],
        pageNumber: 0,
        aiPrompt: titleAndImagedata[1],
        imageURL: "",
      });
      for (let i = 0; i < storyPages?.length; i++) {
        let slicedArr = storyPages?.splice(i, 2);
        pageData.push({
          pageNumber: i + 1,
          storyText: slicedArr[0]?.includes("Generate")
            ? slicedArr[1]
            : slicedArr[0],
          aiPrompt: slicedArr[1]?.includes("Generate")
            ? slicedArr[1]
            : slicedArr[0],
          imageURL: "",
        });
      }
      return pageData;
    },
  });

  const {
    data: imageAndStoryData,
    isFetched: imageAndStoryDataFetched,
    status: imageAndStoryDataStatus,
  } = useQuery({
    queryKey: ["getImages"],
    queryFn: async () => {
      const data = await getImages(storyData);
      setIsBedtimeStoryFetched(false);
      return data;
    },
    enabled: isBedtimeStoryFetched,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    select: (data) => {
      localStorage.setItem("aiPageData", JSON.stringify(data));
      return data;
    },
  });

  const canDisplay =
    (imageAndStoryDataStatus === "success" &&
      status === "success" &&
      imageAndStoryDataFetched &&
      isFetched) ||
    parsedAiPageDataFromLocalStorage.length > 0;

  return (
    <AnimatePresence>
      {!canDisplay && (
        <motion.div
          className="m-auto p-4 bg-black transformNone h-full"
          key="loading-screen"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}>
          <LoadingAnimation />
        </motion.div>
      )}
      {canDisplay && (
        <motion.div
          className="w-full"
          key="story-book-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <StoryBook
            content={imageAndStoryData || parsedAiPageDataFromLocalStorage}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
