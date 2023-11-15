"use client";
import React from "react";
import { AnimatePresence } from "framer-motion";
import ChildMainScreen from "@/components/ChildMainScreen";

const Intro = () => {
  return (
    <AnimatePresence>
      <ChildMainScreen />
    </AnimatePresence>
  );
};

export default Intro;
