import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ChildContext } from "@/contexts/childContext";
import { localStorage } from '@/utils/localStorage';

const Dropdown = () => {
  const { gender, setGender } = useContext(ChildContext);
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
    localStorage.setItem("childGender", e.target.value);
  };
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center">
      <select
        defaultValue={gender}
        onChange={handleOnChange}
        title="gender"
        name="gender"
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        <option value="">{`What is the child's Gender?`}</option>
        <option value="boy">Boy</option>
        <option value="girl">Girl</option>
        <option value="neutral">Neutral</option>
      </select>
    </motion.div>
  );
};

export default Dropdown;
