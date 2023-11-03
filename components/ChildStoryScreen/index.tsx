import { motion } from "framer-motion";
import StoryDetailsInput from "@/components/StoryDetailsInput";
import {ChildContext} from "@/contexts/childContext";
import {useContext} from "react";

interface ChildStoryScreenProps {
  onContinue: () => void;
  onGoBack: () => void;
}
const ChildStoryScreen = (props: ChildStoryScreenProps) => {
  const { story } = useContext(ChildContext);

  const { onContinue, onGoBack } = props;
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
            className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={onGoBack}>
            Go Back
          </button>
          <button
            disabled={story.length < 10}
            className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50"
            onClick={onContinue}>
            Continue
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChildStoryScreen;
