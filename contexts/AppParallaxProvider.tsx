"use client";
import { ParallaxProvider } from "react-scroll-parallax";

interface AppParallaxProviderProps {
  children: React.ReactNode;
}

export const AppParallaxProvider = ({ children }: AppParallaxProviderProps) => {
  return <ParallaxProvider>{children}</ParallaxProvider>;
};

export default AppParallaxProvider;
