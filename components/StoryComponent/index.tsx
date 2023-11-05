"use client";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { ChildContext } from "@/contexts/childContext";
import getBedtimeStory from "@/server/getBedtimeStory";
import getImages from "@/utils/getImages";
import StoryBook from "@/components/StoryBook";
import useImageGenerator from "@/hooks/useGetImageAI";

type PageDataType = {
  aiPrompt: string;
  pageNumber: number;
  storyText: string;
  imageURL: string;
};

export default function StoryComponent({ content }: any) {
  const { name, age, gender, story } = useContext(ChildContext);
  const { data: session } = useSession();
  const [aiPageDataValue, setAiPageDataValue] = useState<any>([]);
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

  const fullContent = data?.data.data.choices[0].message.content;

  const singlePages = fullContent?.split("\n\nPrompt: ");
  const aiGenerations = singlePages?.map((page: string) => {
    return page.split("\n\n");
  })[0];
  const getPageData = () => {
    let pageData = [];
    for (let i = 0; i < aiGenerations?.length; i++) {
      let slicedArr = aiGenerations?.splice(i, 2);
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
  };

  const aiPageData = getPageData();

  useEffect(() => {
    if (aiPageData?.length > 0) {
      // Create an array of promises using map
      const imagePromises = aiPageData.map((page) =>
        getImages({ prompt: page.aiPrompt }),
      );

      Promise.all(imagePromises)
        .then((images) => {
          images.map((image, idx) => {
            aiPageData[idx].imageURL = image[0];
          });
          return setAiPageDataValue(aiPageData);
        })
        .catch((error) => {
          // Handle any errors here
          console.error("Error fetching images:", error);
        });
    }
  }, [aiPageData?.length]);

  const allImagesReady =
    aiPageDataValue.length > 0
      ? aiPageDataValue?.every((page: PageDataType) => {
          return page.imageURL.length > 0;
        })
      : false;
  const canDisplay = isFetched && allImagesReady;
  return (
    <AnimatePresence>
      {!canDisplay && (
        <motion.div
          className="m-auto"
          key="loading-screen"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}>
          Loading...
        </motion.div>
      )}
      {canDisplay && (
        <motion.div
          className="w-full"
          key="story-book-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <StoryBook content={aiPageDataValue} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
