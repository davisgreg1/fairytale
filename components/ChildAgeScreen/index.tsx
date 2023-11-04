import { motion } from "framer-motion";
import InputField from "@/components/InputField";
import { useContext } from "react";
import { ChildContext } from "@/contexts/childContext";
import { localStorage } from '@/utils/localStorage';

interface ChildAgeScreenProps {
  onContinue: () => void;
  onGoBack: () => void;
}
const ChildAgeScreen = (props: ChildAgeScreenProps) => {
  const { age, setAge } = useContext(ChildContext);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(+e.target.value);
    localStorage.setItem("childAge", e.target.value);
  };

  const { onContinue, onGoBack } = props;
  return (
    <motion.div
      key="screen-four"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}>
      <div className="relative flex flex-col justify-between h-screen m-auto">
        <div className={`m-auto`}>
          <InputField
            onChange={handleOnChange}
            defaultValue={age.toString()}
            name={"child age"}
            placeholder={`What is the Child's age?`}
            min={1}
            type={"number"}
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
