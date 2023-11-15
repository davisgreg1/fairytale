"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession, signOut } from "next-auth/react";
import { BannerLayer, ParallaxBanner } from "react-scroll-parallax";
import { useInView } from "react-intersection-observer";
import { useWindowSize } from "@react-hook/window-size/throttled";
// import { useActiveElement } from "@/hooks/useActiveElement";
import { localStorage } from "@/utils/localStorage";
import capitalizedFirstName from "@/utils/capitalizedFirstName";
import { motion } from "framer-motion";
import GetStartedAnimation from "@/components/GetStartedAnimation";
import RadioOptions from "@/components/RadioOptions";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { ChildContext } from "@/contexts/childContext";
import "../../app/globals.css";

const StoryDetailComp = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { ref: inViewRef1, inView: firstSectionInView } = useInView({
    threshold: 1,
  });
  const { ref: inViewRef2, inView: secondSectionInView } = useInView({
    threshold: 1,
  });
  const { ref: inViewRef3, inView: thirdSectionInView } = useInView({
    threshold: 1,
  });
  const { ref: inViewRef4, inView: fourthSectionInView } = useInView({
    threshold: 1,
  });
  const { ref: inViewRef5, inView: fifthSectionInView } = useInView({
    threshold: 1,
  });
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { age, setAge, name, setName, gender, setStory, story } =
    useContext(ChildContext);
  const { status, data: session } = useSession();
  const [widthD, heightD] = useWindowSize();
  const sessionAvailable = status === "authenticated";

  const [width, setWidth] = useState(300);
  const [value, setValue] = useState([1, age]);

  // const activeElement = useActiveElement();

  // const [removeEllipsis, setRemoveEllipsis] = useState(false);

  // Empty dependency array ensures this runs once on mount

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const isMobile = widthD < 720;
  const isTablet = widthD >= 720 && widthD < 1140;
  const isDesktop = widthD >= 1140;

  const handleOnClick = (method: string) => signIn(method);
  const handleSignOut = () => {
    localStorage.clear();
    signOut();
  };

  const handleNavigation = () => {
    sessionAvailable ? router.push("/story") : router.push("/signin");
  };

  // Function to handle scrolling
  // const handleScroll = () => {
  //   const closestBanner = bannerRefs.current.reduce(
  //     (closest: any, bannerRef: any) => {
  //       const banner = bannerRef.current;
  //       if (!banner) return closest;

  //       const bannerRect = banner.getBoundingClientRect();
  //       const bannerDistance = Math.abs(
  //         heightD / 2 - (bannerRect.top + bannerRect.height / 2),
  //       );

  //       return bannerDistance < closest.distance
  //         ? { banner, distance: bannerDistance }
  //         : closest;
  //     },
  //     { banner: null, distance: Infinity },
  //   );

  //   if (closestBanner.banner) {
  //     closestBanner.banner.scrollIntoView({
  //       behavior: "smooth",
  //       block: "end",
  //       inline: "nearest",
  //     });
  //   }
  // };

  // Use `useCallback` so we don't recreate the function on each render
  // const setRefs = useCallback(
  //   (node) => {
  //     // Ref's from useRef needs to have the node assigned to `current`
  //     ref.current = node;
  //     // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
  //     inViewRef(node);
  //   },
  //   [inViewRef],
  // );

  // useEffect(() => {
  //   if (activeElement === textAreaRef.current) {
  //     setRemoveEllipsis(true);
  //   }
  // }, [activeElement, removeEllipsis]);

  useEffect(() => {
    if (firstSectionInView) {
      const firstSection = document.getElementById("firstSection");
      if (firstSection) {
        scrollElementIntoView(firstSection);
      }
    }
    if (secondSectionInView) {
      const secondSection = document.getElementById("secondSection");
      if (secondSection) {
        scrollElementIntoView(secondSection);
      }
    }
    if (thirdSectionInView) {
      const thirdSection = document.getElementById("thirdSection");
      if (thirdSection) {
        scrollElementIntoView(thirdSection);
      }
    }

    if (fourthSectionInView) {
      const fourthSection = document.getElementById("fourthSection");
      if (fourthSection) {
        scrollElementIntoView(fourthSection);
      }
    }

    if (fifthSectionInView) {
      const fifthSection = document.getElementById("fifthSection");
      if (fifthSection) {
        scrollElementIntoView(fifthSection);
      }
    }
  }, [
    firstSectionInView,
    secondSectionInView,
    thirdSectionInView,
    fourthSectionInView,
    fifthSectionInView,
  ]);

  const scrollElementIntoView = (element: HTMLElement) => {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  };

  const handleRangeSliderOnChange = (e: [number, number]) => {
    setValue(e);
    setAge(e[1]);
    localStorage.setItem("childAge", e[1].toString());
  };

  const handleOnNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    localStorage.setItem("childName", e.target.value);
  };

  const handleOnTextAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setStory(e.target.value);
    localStorage.setItem("childStory", e.target.value);
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

  const childsNameHeadline: BannerLayer = {
    translateY: isMobile ? [-10, 30] : [-15, 25],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="mobile:text-4xl tablet:text-6xl desktop:text-6xl text-white font-thin text-center">
          What Is Your Little Creator&rsquo;s Name?
        </h1>
      </div>
    ),
  };

  const childsAgeHeadline: BannerLayer = {
    translateY: isMobile ? [-50, 30] : [-40, 25],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="mobile:text-4xl tablet:text-6xl desktop:text-6xl text-white font-thin text-center">
          What Is Your Little Creator&rsquo;s Age?
        </h1>
      </div>
    ),
  };

  const childsGenderHeadline: BannerLayer = {
    translateY: isMobile ? [-50, 30] : [-40, 25],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="mobile:text-4xl tablet:text-6xl desktop:text-6xl text-white font-thin text-center">
          {name
            ? `What is ${capitalizedFirstName(name)}'s Gender?`
            : `What Is Your Little Creator's?`}
        </h1>
      </div>
    ),
  };

  const childsStoryHeadline: BannerLayer = {
    translateY: isMobile ? [-50, 30] : [-40, 25],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute inset-0 flex items-center justify-center m-4">
        <h1 className="mobile:text-4xl tablet:text-6xl desktop:text-6xl text-white font-thin text-center">
          {name
            ? `${capitalizedFirstName(name)}, What's Your Tale About?`
            : `What Is Your Little Creator's Tale About?`}
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
          {`Let's go, ${capitalizedFirstName(name)}!`}
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
      {/* What's the child's name */}
      <section ref={inViewRef1} id="firstSection">
        <ParallaxBanner
          layers={[background, childsNameHeadline, foreground, gradientOverlay]}
          className="aspect-[2/1] bg-gray-900 h-screen ">
          <motion.div className="m-auto relative top-[45%] flex justify-center items-center">
            <motion.input
              ref={inputRef}
              onChange={handleOnNameChange}
              type="text"
              defaultValue={name}
              placeholder="Type Name"
              className="hover:placeholder-black mobile:text-4xl tablet:text-5xl desktop:text-5xl text-cyan-200 font-thin text-center bg-transparent border-b-2 border-white .placeHolderName"
              style={{ width: `${width}px` }}
              animate={{ width: `${width}px` }}
              transition={{ type: "just", stiffness: 500 }}
            />
          </motion.div>
        </ParallaxBanner>
      </section>
      {/* What age */}
      <section ref={inViewRef2} id="secondSection">
        <ParallaxBanner
          layers={[background, childsAgeHeadline, foreground, gradientOverlay]}
          className="aspect-[2/1] bg-gray-900 h-screen ">
          <motion.div className="m-auto relative top-1/2 flex justify-center items-center flex-col w-64">
            <div className="w-max pb-16 mobile:text-4xl tablet:text-5xl desktop:text-5xl text-cyan-200 font-thin text-center">
              {age}{" "}
              <span className="whitespace-nowrap">{`Year${
                age === 1 ? "" : "s"
              } old`}</span>
            </div>
            <RangeSlider
              onInput={handleRangeSliderOnChange}
              value={value}
              className="single-thumb opacity-50"
              defaultValue={[1, age]}
              thumbsDisabled={[true, false]}
              rangeSlideDisabled={false}
              min={1}
              max={12}
            />
          </motion.div>
        </ParallaxBanner>
      </section>
      {/* What is the gender */}
      <section ref={inViewRef3} id="thirdSection">
        <ParallaxBanner
          layers={[
            background,
            childsGenderHeadline,
            foreground,
            gradientOverlay,
          ]}
          className="aspect-[2/1] bg-gray-900 h-screen ">
          <motion.div className="m-auto relative top-1/2 flex justify-center items-center flex-col w-64">
            <div className="w-max pb-16 mobile:text-4xl tablet:text-5xl desktop:text-5xl text-cyan-200 font-thin text-center">
              <RadioOptions />
            </div>
          </motion.div>
        </ParallaxBanner>
      </section>
      {/* What is the story */}
      <section ref={inViewRef4} id="fourthSection">
        <ParallaxBanner
          layers={[
            background,
            childsStoryHeadline,
            foreground,
            gradientOverlay,
          ]}
          className="aspect-[2/1] bg-gray-900 h-screen ">
          <motion.div className="m-auto relative top-[40%] flex justify-center items-center flex-col w-64">
            <div className="w-max pb-16 mobile:text-4xl tablet:text-5xl desktop:text-5xl text-cyan-200 font-thin text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center flex-col justify-center w-[350px] h-96 tablet:w-[500px] desktop:w-[777px]">
                <textarea
                  ref={textAreaRef}
                  defaultValue={story.length >= 30 ? story : `A story about `}
                  onChange={handleOnTextAreaChange}
                  name="storyDetails"
                  rows={4}
                  required={true}
                  minLength={1}
                  maxLength={200}
                  placeholder={`Example: A story about ${
                    gender === "Boy" || gender === "Girl"
                      ? `a ${gender.toLowerCase()}`
                      : "the child"
                  } who saved Christmas.`}
                  className="form-textarea hover:placeholder-black mobile:text-3xl tablet:text-4xl desktop:text-5xl text-cyan-200 font-thin text-center bg-transparent border-b-2 border-none focus:outline-none .placeHolderName p-4 w-auto"
                />
              </motion.div>
            </div>
          </motion.div>
        </ParallaxBanner>
      </section>
      {/* Let's go! */}
      <section ref={inViewRef5} id="fifthSection">
        <ParallaxBanner
          layers={[backgroundFull, getStartedHeadline, foreground]}
          className="aspect-[2/1] bg-black h-screen ">
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
      </section>
    </div>
  );
};

export default StoryDetailComp;
