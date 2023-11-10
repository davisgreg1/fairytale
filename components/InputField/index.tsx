import React from "react";
import { motion } from "framer-motion";

interface InputFieldType {
  type: string;
  name: string;
  placeholder: string;
  min?: number;
  max?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
}

const InputField = ({
  type,
  name,
  placeholder,
  min,
  max,
  onChange,
  defaultValue
}: InputFieldType) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center">
      <input
        type={type}
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        min={min}
        max={max}
        onChange={(e) => onChange(e)}
        className="text-cyan-700 form-input px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out"
      />
    </motion.div>
  );
};

export default InputField;
