"use client";
import { useContext } from "react";
import { motion } from "framer-motion";
import InputField from "@/components/InputField";
import { ChildContext } from "@/contexts/childContext";
import { localStorage } from "@/utils/localStorage";

interface ChildNameScreenProps {
  onContinue: () => void;
  onGoBack: () => void;
}
const ChildNameScreen = (props: ChildNameScreenProps) => {
  const { onContinue, onGoBack } = props;
  const { name, setName } = useContext(ChildContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    localStorage.setItem("childName", e.target.value);
  };

  return (
    <motion.div
      key="screen-two"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}>
      <div className="relative flex flex-col justify-between h-screen m-auto">
        <div className={`m-auto`}>
          <div className="p-4">
            {name ? "Create a tale for:" : "What is your child's name?"}
          </div>
          <InputField
            defaultValue={name}
            name={"child name"}
            placeholder={`Child's name?`}
            type={"text"}
            onChange={onChange}
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
            disabled={!name}
            className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50"
            onClick={onContinue}>
            Continue
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChildNameScreen;
