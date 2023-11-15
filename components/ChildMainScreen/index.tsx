"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { signIn, useSession, signOut } from "next-auth/react";
import { BannerLayer, Parallax, ParallaxBanner } from "react-scroll-parallax";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useLottie } from "lottie-react";
import getStarted from "@/lib/getStarted.json";
import { useWindowSize } from "@react-hook/window-size/throttled";
import { localStorage } from "@/utils/localStorage";
import { motion } from "framer-motion";
import GetStartedAnimation from "@/components/GetStartedAnimation";

const ChildMainScreen = () => {
  const [widthD] = useWindowSize();
  const isMobile = widthD < 720;
  const isTablet = widthD >= 720 && widthD < 1140;
  const isDesktop = widthD >= 1140;
  const { status, data: session } = useSession();
  const router = useRouter();

  const sessionAvailable = status === "authenticated";

  const handleOnClick = (method: string) => signIn(method);
  const handleSignOut = () => {
    localStorage.clear();
    signOut();
  };

  const handleNavigation = () => {
    sessionAvailable ? router.push("/storyDetails") : router.push("/signin");
  };

  const background: BannerLayer = {
    /**
     * width: 1352px;
    aspect-ratio: auto 1352 / 901;
    height: 901px;
     */
    image: "/images/starrySky.jpg",
    translateY: [0, 50],
    opacity: [1, 0.3],
    scale: [1.05, 1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
  };

  const backgroundFull: BannerLayer = {
    /**
     * width: 1352px;
    aspect-ratio: auto 1352 / 901;
    height: 901px;
     */
    image: "/images/starrySky.jpg",
    translateY: [0, 50],
    opacity: [1, 0.3],
    scale: [1.05, 1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    className: "h-screen",
  };

  const yourFairyTaleHeadline: BannerLayer = {
    translateY: isMobile ? [-10, 30] : [-5, 30],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="mobile:text-4xl tablet:text-6xl desktop:text-6xl text-white font-thin">
          Your Fairy Tale.
        </h1>
      </div>
    ),
  };

  const createdByYouHeadline: BannerLayer = {
    translateY: isMobile ? [-30, 30] : [-20, 30],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="mobile:text-4xl tablet:text-6xl desktop:text-6xl text-white font-thin">
          Designed By You.
        </h1>
      </div>
    ),
  };

  const getStartedHeadline: BannerLayer = {
    translateY: isMobile ? [-7, 0] : [5, 0],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="mobile:text-4xl tablet:text-6xl desktop:text-6xl text-white font-thin">
          Get Started.
        </h1>
      </div>
    ),
  };

  const foreground: BannerLayer = {
    /**
     * width: 1352px;
    aspect-ratio: auto 1352 / 901;
    height: 901px;
     */
    image: "/images/brownMountain.png",
    translateY: [0, 15],
    scale: [1, 1.1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
  };

  const gradientOverlay: BannerLayer = {
    opacity: [0, 0.9],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-blue-900" />
    ),
  };

  return (
    <div>
      {/* Your Fairy Tale */}
      <ParallaxBanner
        layers={[
          background,
          yourFairyTaleHeadline,
          foreground,
          gradientOverlay,
        ]}
        className="aspect-[2/1] bg-gray-900 h-screen"
      />
      {/* Designed By You */}
      <ParallaxBanner
        layers={[background, createdByYouHeadline, foreground, gradientOverlay]}
        className="aspect-[2/1] bg-gray-900 h-screen"
      />
      {/* Get Started */}
      <ParallaxBanner
        layers={[backgroundFull, getStartedHeadline, foreground]}
        className="aspect-[2/1] bg-black h-screen">
        <div className="w-36 h-36 m-auto relative top-1/2">
          <button
            onClick={handleNavigation}
            type="button"
            title="Get Started Button"
            className="cursor-pointer select-none">
            <GetStartedAnimation />
          </button>
        </div>
      </ParallaxBanner>
    </div>
  );
};

export default ChildMainScreen;
