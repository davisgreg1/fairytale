"use client";
import React from "react";
import { AnimatePresence } from "framer-motion";
import ChildMainScreen from "@/components/ChildMainScreen";

const Intro = () => {
  return (
    <div id="page-wrap">
      <AnimatePresence>
        <ChildMainScreen />
      </AnimatePresence>
    </div>
  );
};

export default Intro;
