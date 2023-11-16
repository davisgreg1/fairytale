import React from "react";
import { useLottie } from "lottie-react";
import next from "@/lib/next.json";

const NextAnimation = () => {
  const options = {
    animationData: next,
    loop: true,
  };

  const { View } = useLottie(options);

  return <>{View}</>;
};

export default NextAnimation;
