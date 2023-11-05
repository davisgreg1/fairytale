import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { ChildContext } from "@/contexts/childContext";
import { localStorage } from "@/utils/localStorage";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

interface ChildAgeScreenProps {
  onContinue: () => void;
  onGoBack: () => void;
}
const ChildAgeScreen = (props: ChildAgeScreenProps) => {
  const { age, setAge, name } = useContext(ChildContext);
  const [value, setValue] = useState([1, age]);

  const handleOnChange = (e: [number, number]) => {
    setValue(e);
    setAge(e[1]);
    localStorage.setItem("childAge", e[1].toString());
  };

  const { onContinue, onGoBack } = props;
  return (
    <motion.div
      key="screen-four"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}>
      <div className="relative flex flex-col justify-between h-screen m-auto">
        <div className={`m-auto w-[300px]`}>
          <div className="p-4">{`${name}'s age: ${value[1]}`}</div>
          <RangeSlider
            onInput={handleOnChange}
            value={value}
            className="single-thumb"
            defaultValue={[1, age]}
            thumbsDisabled={[true, false]}
            rangeSlideDisabled={false}
            min={1}
            max={12}
          />
        </div>
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

export default ChildAgeScreen;
