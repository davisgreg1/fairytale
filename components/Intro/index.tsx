"use client";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ChildMainScreen from "@/components/ChildMainScreen";
import ChildNameScreen from "@/components/ChildNameScreen";
import ChildGenderScreen from "@/components/ChildGenderScreen";
import ChildAgeScreen from "@/components/ChildAgeScreen";
import ChildStoryScreen from "@/components/ChildStoryScreen";

const Intro = () => {
  const [currentScreen, setCurrentScreen] = useState(1);

  return (
    <AnimatePresence>
      {currentScreen === 1 && (
        <ChildMainScreen onContinue={() => setCurrentScreen(2)} />
      )}
      {currentScreen === 2 && (
        <ChildNameScreen
          onContinue={() => setCurrentScreen(3)}
          onGoBack={() => setCurrentScreen(1)}
        />
      )}
      {currentScreen === 3 && (
        <ChildGenderScreen
          onContinue={() => setCurrentScreen(4)}
          onGoBack={() => setCurrentScreen(2)}
        />
      )}
      {currentScreen === 4 && (
        <ChildAgeScreen
          onContinue={() => setCurrentScreen(5)}
          onGoBack={() => setCurrentScreen(3)}
        />
      )}
      {currentScreen === 5 && (
        <ChildStoryScreen
          onContinue={() => setCurrentScreen(6)}
          onGoBack={() => setCurrentScreen(4)}
        />
      )}
      {/* ...and so on for other screens */}
    </AnimatePresence>
  );
};

export default Intro;
