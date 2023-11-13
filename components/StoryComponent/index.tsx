"use client";
import React, { useContext, useState, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import { localStorage } from "@/utils/localStorage";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ChildContext } from "@/contexts/childContext";
import getBedtimeStory from "@/server/getBedtimeStory";
import getImages from "@/utils/getImages";
import StoryBook from "@/components/StoryBook";
import LoadingAnimation from "@/components/LoadingAnimation";

type ResultsType = {
  pageNumber?: string;
  title?: string;
  storyText?: string;
  aiPrompt?: string;
  imageURL?: string;
}[];

type StoryObjectType = {
  pageNumber?: string;
  title?: string;
  storyText?: string;
  aiPrompt?: string;
  imageURL?: string;
};

export default function StoryComponent() {
  const ref = useRef<any>(null);
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
      return `generate ${story}. The main character is: ${name}, age: ${age}, gender: ${gender}. Here are the rules: 1. it MUST be a 470 word bedtime fairy tale. 2.It MUST include a title and an image for the book 3.The generated image MUST come after the title 4. Each different section should have a prompt at the end for novita-sdk to generate an image. 5. The prompt MUST begin with the phrase Generate an image. 6. Each page (BEFORE the actual content) MUST be labeled as Page 1, Page 2, etc...`;
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
      if (ref && ref.current) {
        ref?.current?.continuousStart();
      }
      const data = await getBedtimeStory(queryOptions);
      setIsBedtimeStoryFetched(true);
      return data;
    },
    enabled: parsedAiPageDataFromLocalStorage.length === 0,
    staleTime: Infinity,
    select: (data) => {
      const storyPages = data?.data.split("\n\n");
      return storyPages;
    },
  });
  async function processData(data: string[]) {
    const results: ResultsType = [];
    let mostRecentPage = "";
    let storyObject: StoryObjectType = {};
    for (let i = 0; i < data?.length; i++) {
      const currentElement = data[i];
      if (currentElement.startsWith("Title: ")) {
        const objToAddTo = results.filter(
          (obj) => obj.pageNumber === mostRecentPage,
        );
        if (objToAddTo.length === 0) {
          mostRecentPage = "Page 0";
          results.push({
            pageNumber: mostRecentPage,
            title: currentElement.replace(`Title: "`, "").replace(`"`, ""),
          });
        }
      }
      if (currentElement.startsWith("Page ")) {
        mostRecentPage = currentElement;
        if (storyObject.pageNumber !== mostRecentPage) {
          storyObject.pageNumber = mostRecentPage;
        }

        results.push({
          pageNumber: mostRecentPage,
        });
      } else if (currentElement.startsWith("Generate an image ")) {
        const objToAddTo = results.filter(
          (obj) => obj.pageNumber === mostRecentPage,
        );
        objToAddTo[0].aiPrompt = currentElement;
      } else {
        const objToAddTo = results.filter(
          (obj) => obj.pageNumber === mostRecentPage,
        );
        if (objToAddTo.length === 0) {
          results[0].storyText = currentElement;
        } else {
          objToAddTo[0].storyText = currentElement;
        }
      }
    }
    return results;
  }

  const getResults = async () => {
    const results = await Promise.resolve(processData(storyData));
    return results;
  };

  const {
    data: imageAndStoryData,
    isFetched: imageAndStoryDataFetched,
    status: imageAndStoryDataStatus,
  } = useQuery({
    queryKey: ["getImages"],
    queryFn: async () => {
      const aiStoryData = await getResults();
      const data = await getImages(aiStoryData);
      setIsBedtimeStoryFetched(false);
      if (ref && ref.current) {
        ref?.current?.complete();
      }
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
    <>
      <LoadingBar color="#f11946" ref={ref} />
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
    </>
  );
}
