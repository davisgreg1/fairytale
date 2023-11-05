"use client";
import { motion } from "framer-motion";
import StoryDetailsInput from "@/components/StoryDetailsInput";
import { ChildContext } from "@/contexts/childContext";
import { useContext } from "react";
import Link from "next/link";

interface ChildStoryScreenProps {
  onContinue: () => void;
  onGoBack: () => void;
}
const ChildStoryScreen = (props: ChildStoryScreenProps) => {
  const { story, name } = useContext(ChildContext);

  const { onContinue, onGoBack } = props;

  const handleOnClick = () => {
    onContinue();
  };
  return (
    <motion.div
      key="screen-five"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}>
      <div className="relative flex flex-col justify-between h-screen m-auto">
        <div className={`m-auto`}>
          <StoryDetailsInput />
        </div>
        <div className="flex justify-center pb-4">
          {" "}
          <button
            type="button"
            title="go back"
            className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={onGoBack}>
            Go Back
          </button>
          {story.length < 30 ? (
            <button
              type="button"
              title="generate a story"
              disabled={true}
              className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50"
              onClick={handleOnClick}>
              Generate Story
            </button>
          ) : (
            <Link
              type="button"
              href="/story"
              className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50">
              Generate Story
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChildStoryScreen;
