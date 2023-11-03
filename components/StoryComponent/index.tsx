"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ChildContext } from "@/contexts/childContext";
import { useSession } from "next-auth/react";
import StoryBook from "@/components/StoryBook";

export default function StoryComponent() {
  const { name, age, gender, story } = useContext(ChildContext);
  const { data: session } = useSession();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const getAIPrompt = () => {
    return `generate ${story}. The main character is: ${name}, age: ${age}, gender: ${gender}. Here are the rules: 1. it must be a 370 word bedtime fairy tale. 2. Each different section should have a prompt at the end for novita-sdk to generate an image. 3. The prompt MUST begin with the phrase Generate an image`;
  };

  useEffect(() => {
    const getStory = async () => {
      const prompt = getAIPrompt();
      try {
        if (name && age && gender && story.length > 30) {
          setLoading(true);
          const res = await axios.post("/api/story", {
            inputText: prompt,
            email: "davisgreg1@gmail.com",
          });
          setLoading(false);
          const contentValue = res.data.data.choices[0].message.content;
          setContent(contentValue);
        }
      } catch (error) {
        console.log(
          "GREG LOOK!  ~ file: index.tsx:13 ~ getStory ~ error:",
          error,
        );
      }
    };
    getStory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full">
      {loading ? <div>loading</div> : <StoryBook content={content} />}
    </div>
  );
}
