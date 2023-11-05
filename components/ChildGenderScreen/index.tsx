import { motion } from "framer-motion";
import Dropdown from "@/components/DropDown";
import {useContext} from "react";
import {ChildContext} from "@/contexts/childContext";

interface ChildGenderScreenProps {
  onContinue: () => void;
  onGoBack: () => void;
}
const ChildGenderScreen = (props: ChildGenderScreenProps) => {
  const { gender, name } = useContext(ChildContext);

  const { onContinue, onGoBack } = props;
  return (
    <motion.div
      key="screen-three"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}>
      <div className="relative flex flex-col justify-between h-screen m-auto">
        <div className={`m-auto`}>
        <div className="p-4">{`${name}'s gender`}</div>
          <Dropdown />
        </div>

        <div className="flex justify-center pb-4">
          {" "}
          <button
            className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={onGoBack}>
            Go Back
          </button>
          <button
            disabled={gender === ""}
            className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50"
            onClick={onContinue}>
            Continue
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChildGenderScreen;
