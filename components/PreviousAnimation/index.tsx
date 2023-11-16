import React from "react";
import { useLottie } from "lottie-react";
import previous from "@/lib/previous.json";

const PreviousAnimation = () => {
  const options = {
    animationData: previous,
    loop: true,
  };

  const { View } = useLottie(options);

  return <>{View}</>;
};

export default PreviousAnimation;
