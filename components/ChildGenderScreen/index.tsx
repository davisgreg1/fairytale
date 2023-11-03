import { motion } from "framer-motion";

interface ChildGenderScreenProps {
  onContinue: () => void;
  onGoBack: () => void;
}
const ChildGenderScreen = (props: ChildGenderScreenProps) => {
  const { onContinue, onGoBack } = props;
  return (
    <motion.div
      key="screen-three"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}>
      <div className="relative flex flex-col justify-between h-screen m-auto">
        <div className={`m-auto`}>Gender Screen Here</div>
        <div className="flex justify-center pb-4">
          {" "}
          <button
            className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={onGoBack}>
            Go Back
          </button>
          <button
            className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={onContinue}>
            Continue
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChildGenderScreen;
