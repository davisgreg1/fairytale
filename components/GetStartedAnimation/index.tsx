import React from "react";
import { useLottie } from "lottie-react";
import getStarted from "@/lib/getStarted.json";

const GetStartedAnimation = () => {
  const options = {
    animationData: getStarted,
    loop: true,
  };

  const { View } = useLottie(options);

  return <>{View}</>;
};

export default GetStartedAnimation;
