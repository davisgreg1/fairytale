"use client";
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { localStorage } from "@/utils/localStorage";
import { ChildContext } from "@/contexts/childContext";

const RadioOptions = () => {
  const [selected, setSelected] = useState("");

  const { gender, setGender } = useContext(ChildContext);

  const handleOnGenderChange = (value: string) => {
    setSelected(value);
    setGender(value);
    localStorage.setItem("childGender", value);
  };

  const radioOptions = ["Boy", "Girl", "Neutral"];

  return (
    <div className="flex mr-4">
      {radioOptions.map((option) => (
        <motion.label
          key={option}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center flex-row">
          <motion.input
            type="radio"
            name="gender"
            defaultChecked={(gender as string) === option}
            value={option}
            onChange={() => handleOnGenderChange(option)}
            className="m-4"
          />
          {option}
        </motion.label>
      ))}
    </div>
  );
};

export default RadioOptions;
