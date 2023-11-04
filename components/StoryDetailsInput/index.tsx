import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ChildContext } from "@/contexts/childContext";

const StoryDetailsInput = () => {
  const { story, setStory } = useContext(ChildContext);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStory(e.target.value);
    localStorage.setItem("childStory", e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center w-[350px] h-96 md:w-[500px] lg:w-[777px]">
      <textarea
        defaultValue={story.length >= 30 ? story : "A story about "}
        onChange={handleOnChange}
        name="storyDetails"
        rows={4}
        placeholder="Tell us a bit about the story you want, for example: 'A story about a little girl that saved Christmas.'"
        className="form-textarea mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </motion.div>
  );
};

export default StoryDetailsInput;
