import React from "react";
import { useLottie } from "lottie-react";
import loadingAnim from "@/lib/loadingAnim.json";

const LoadingAnimation = () => {
  const options = {
    animationData: loadingAnim,
    loop: true,
  };

  const { View } = useLottie(options);

  return <>{View}</>;
};

export default LoadingAnimation;
