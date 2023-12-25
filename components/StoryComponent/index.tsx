"use client";
import React, { useContext, useState, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import { localStorage } from "@/utils/localStorage";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ChildContext } from "@/contexts/childContext";
import getBedtimeStory from "@/server/actions/getBedtimeStory";
import getImages from "@/utils/getImages";
import StoryBook from "@/components/StoryBook";
import LoadingAnimation from "@/components/LoadingAnimation";
import {
  fetchCurrentUser,
  increaseBookCount,
  updateFreeStoriesRemaining,
  updateFairyTaleContent,
} from "@/server/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const ref = useRef<any>(null);
  const { data: session } = useSession();
  const userId = session?.user.id;
  const aiPageDataFromLocalStorage = localStorage.getItem(
    "aiPageData",
  ) as string;
  const parsedAiPageDataFromLocalStorage =
    aiPageDataFromLocalStorage?.length > 0
      ? JSON.parse(aiPageDataFromLocalStorage)
      : [];
  const { name, age, gender, story } = useContext(ChildContext);
  const [isBedtimeStoryFetched, setIsBedtimeStoryFetched] = useState(false);

  const {
    data: currentUser,
    isFetched: fetchedCurrentUser,
    status: fetchCurrentUserStatus,
    isStale,
  } = useQuery({
    queryKey: ["fetchCurrentUser", userId],
    queryFn: async () => {
      if (userId) {
        const data = await fetchCurrentUser(userId);
        return data;
      }
    },
    enabled: true,
  });
  const enabled = currentUser && currentUser[0].freeStoriesRemaining > 0;
  const {
    data: storyData,
    isFetched,
    isFetching,
    status,
  } = useQuery({
    queryKey: ["bedtimeStory"],
    queryFn: async () => {
      if (ref && ref.current) {
        ref?.current?.continuousStart(0, 8500);
      }
      const data = await getBedtimeStory({ story, name, age, gender });
      setIsBedtimeStoryFetched(true);
      return data;
    },
    enabled: !!enabled,
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
    isFetching: isFetchingImages,
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
      if (data) {
        if (userId && data.length > 0) {
          increaseBookCount(userId);
          if (currentUser && currentUser[0].freeStoriesRemaining > 0) {
            updateFreeStoriesRemaining("dec", userId);
          }
        }
        return data;
      }
    },
    enabled: isBedtimeStoryFetched,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    select: (data) => {
      const jsonData = JSON.stringify(data);
      localStorage.setItem("aiPageData", jsonData);
      if (userId) {
        updateFairyTaleContent(userId, jsonData);
      }
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
      <LoadingBar
        style={{
          height: "7px",
        }}
        color="#C9002B"
        ref={ref}
      />
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
              isFetchingImages={isFetchingImages}
              isFetching={isFetching}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
