"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { BannerLayer, ParallaxBanner } from "react-scroll-parallax";
import { useInView } from "react-intersection-observer";
import { useWindowSize } from "@react-hook/window-size/throttled";
import { fetchCurrentUser } from "@/server/actions";
import { localStorage } from "@/utils/localStorage";
import capitalizedFirstName from "@/utils/capitalizedFirstName";
import { motion } from "framer-motion";
import GetStartedAnimation from "@/components/GetStartedAnimation";
import { ChildContext } from "@/contexts/childContext";
import "../../app/globals.css";

const StoryDetailComp = () => {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { ref: inViewRefName, inView: nameSectionInView } = useInView({
    threshold: 1,
  });

  const { ref: inViewRefAge, inView: ageSectionInView } = useInView({
    threshold: 1,
  });

  const { ref: inViewRefGender, inView: genderSectionInView } = useInView({
    threshold: 0.8,
  });
  const { ref: inViewRefStory, inView: storySectionInView } = useInView({
    threshold: 0.8,
  });
  const { ref: inViewRefSubmit, inView: submitSectionInView } = useInView({
    threshold: 1,
  });

  const { age, setAge, name, setName, setGender, gender, setStory, story } =
    useContext(ChildContext);
  const { status, data: session } = useSession();
  const userId = session?.user.id;
  const [widthD, heightD] = useWindowSize();
  const sessionAvailable = status === "authenticated";
  const radioOptions = ["Boy", "Girl", "Neutral"];
  const defaultStoryText = `A story about... `;

  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [width, setWidth] = useState(300);
  const [value, setValue] = useState([1, age]);
  const [scrollingToErrors, setScrollingToErrors] = useState(false);
  const [userBookCount, setUserBookCount] = useState<number>(-1);
  const [enableFetchUser, setEnableFetchUser] = useState(true);

  const nameRegEx = /^[A-Za-zÀ-ÖØ-öø-ÿ-']+(?:[ -][A-Za-zÀ-ÖØ-öø-ÿ-']+)*$/;

  const nameValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required.")
      .min(2, "Name must be at least 2 characters.")
      .max(50, "Name must not exceed 50 characters.")
      .matches(nameRegEx, "Name must be alphabetic.")

      .trim(),
    gender: Yup.string()
      .required("Selecting a gender is required.")
      .oneOf(["Boy", "Girl", "Neutral"], "Invalid selection."),
    story: Yup.string()
      .min(10, "At least 10 characters.")
      .max(140, "140 characters or less.")
      .trim()
      .required("Fairy tale is required."),
  });

  const formik = useFormik({
    initialValues: {
      name: name || "",
      age: age || 1,
      gender: gender || "",
      story: story.length >= 30 ? story : defaultStoryText,
    },
    validationSchema: nameValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { handleChange, errors, dirty, setFieldError, values, isValid } =
    formik;
  const isNameFieldValid = nameValidationSchema.isValidSync({
    name,
    gender,
    story,
  });

  const isMobile = widthD < 720;
  const isTablet = widthD >= 720 && widthD < 1140;
  const isDesktop = widthD >= 1140;

  const {
    data: currentUser,
    isFetched,
    status: fetchCurrentUserStatus,
    isStale,
  } = useQuery({
    queryKey: ["fetchCurrentUser", userId],
    queryFn: async () => {
      if (userId) {
        const data = await fetchCurrentUser(userId);
        if (data) {
          setUserBookCount(data[0]?.bookCount);
          return data;
        }
      }
    },
    enabled: enableFetchUser,
    staleTime: 60 * 60000, // 1 hour
  });

  useEffect(() => {
    if (isStale) {
      setEnableFetchUser(true);
    } else {
      setEnableFetchUser(false);
    }
  }, [isStale, userId]);

  useEffect(() => {
    if (!values.gender && genderSectionInView) {
      setFieldError("gender", "Gender is required.");
    }
  }, [genderSectionInView]);

  useEffect(() => {
    const handleScroll = () => {
      if (nameSectionInView) {
        const scrollY = window.scrollY;
        const scrollThreshold = isMobile
          ? window.innerHeight / 2 / 2 / 2
          : window.innerHeight / 2 / 2; // Adjust this value as needed
        const scrolled = scrollY / scrollThreshold; // Faster color change

        const opacity = Math.min(1, Math.max(scrolled, 0));
        const color = `rgba(99, 85, 85, ${opacity})`; // #635555 in rgba

        setBackgroundColor(color);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  const marks = [
    {
      value: 1,
      label: <span className="text-cyan-200 font-thin text-xl">{"1"}</span>,
    },
    {
      value: 2,
      label: <span className="text-cyan-200 font-thin text-xl">{"2"}</span>,
    },
    {
      value: 3,
      label: <span className="text-cyan-200 font-thin text-xl">{"3"}</span>,
    },
    {
      value: 4,
      label: <span className="text-cyan-200 font-thin text-xl">{"4"}</span>,
    },
    {
      value: 5,
      label: <span className="text-cyan-200 font-thin text-xl">{"5"}</span>,
    },
    {
      value: 6,
      label: <span className="text-cyan-200 font-thin text-xl">{"6"}</span>,
    },
    {
      value: 7,
      label: <span className="text-cyan-200 font-thin text-xl">{"7"}</span>,
    },
    {
      value: 8,
      label: <span className="text-cyan-200 font-thin text-xl">{"8"}</span>,
    },
    {
      value: 9,
      label: <span className="text-cyan-200 font-thin text-xl">{"9"}</span>,
    },
    {
      value: 10,
      label: <span className="text-cyan-200 font-thin text-xl">{"10"}</span>,
    },
    {
      value: 11,
      label: <span className="text-cyan-200 font-thin text-xl">{"11"}</span>,
    },
    {
      value: 12,
      label: <span className="text-cyan-200 font-thin text-xl">{"12"}</span>,
    },
  ];

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
        <h1 className="mobile:text-4xl tablet:text-6xl desktop:text-6xl text-white font-thin text-center mx-4">
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

  const getBookCountText = () => {
    switch (currentUser && currentUser[0].freeStoriesRemaining) {
      case 3:
        return "You have 3 free stories remaining!";
      case 2:
        return "You have 2 free stories remaining!";
      case 1:
        return "You have 1 free story remaining!";
      default:
        return "Purchase to unlock!";
    }
  };

  const getStartedHeadline: BannerLayer = {
    translateY: isMobile ? [-7, 0] : [5, 0],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <h1 className="mobile:text-4xl tablet:text-6xl desktop:text-6xl text-white font-thin">
          {`${
            isValid && values.story !== defaultStoryText
              ? `Let's go, ${capitalizedFirstName(name)}!`
              : `Fill in the details.`
          }`}
        </h1>
        <span className="mobile:text-2xl tablet:text-3xl desktop:text-3xl text-white font-thin mt-4">
          {getBookCountText()}
        </span>
      </div>
    ),
  };

  const foreground: BannerLayer = {
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

  const customHandleNameChange = (event: any) => {
    handleChange(event);

    localStorage.setItem("childName", event.target.value);
    setName(event.target.value);
  };

  const customHandleAgeChange = (event: any) => {
    handleChange(event);

    localStorage.setItem("childAge", event.target.value);
    setAge(event.target.value);
  };

  const customHandleGenderChange = (event: any) => {
    handleChange(event);

    localStorage.setItem("childGender", event.target.value);
    setGender(event.target.value);
  };

  const customHandleStoryChange = (event: any) => {
    handleChange(event);

    localStorage.setItem("childStory", event.target.value);
    setStory(event.target.value);
  };

  const handleNavigation = () => {
    if (!values.name) {
      setScrollingToErrors(true);
      nameRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
      nameRef?.current?.focus();
      setFieldError("name", "Name is required.");
    } else if (!values.gender) {
      setScrollingToErrors(true);
      genderRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    } else if (values.story === defaultStoryText || !values.story) {
      setScrollingToErrors(false);
      textAreaRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
      const textAreaElement = textAreaRef?.current;
      if (textAreaElement) {
        textAreaElement.focus();

        const length = textAreaElement.value.length;
        textAreaElement.setSelectionRange(length, length);
      }

      setFieldError("story", "Fairy Tale is required.");
    } else {
      switch (true) {
        case currentUser && +currentUser[0]?.freeStoriesRemaining === 0:
          return router.push("/purchase");

        case sessionAvailable:
          return router.push("/story");
        case !sessionAvailable:
          return router.push("/signin");
      }
    }
  };

  const hasErrors =
    !values.name ||
    !values.gender ||
    values.story === defaultStoryText ||
    !values.story;

  const determineErrorSection = () => {
    if (!values.name) {
      return "name.";
    } else if (!values.gender) {
      return "gender.";
    } else if (values.story === defaultStoryText || !values.story) {
      return "fairy tale.";
    }
  };
  // #635555
  return (
    <form onSubmit={formik.handleSubmit}>
      {/* What's the child's name formik */}
      <section ref={inViewRefName} id="nameSection">
        <ParallaxBanner
          layers={[background, childsNameHeadline, foreground, gradientOverlay]}
          className="aspect-[2/1] bg-gray-900 h-screen ">
          <motion.div className="m-auto mobile:max-tablet:mt-4 relative top-[45%] flex justify-center items-center flex-col">
            <motion.input
              name="name"
              id="name"
              ref={nameRef}
              maxLength={51}
              onChange={customHandleNameChange}
              value={formik.values.name}
              type="text"
              placeholder="Type Name"
              className={`hover:placeholder-black shadow-2xl mobile:text-4xl tablet:text-5xl desktop:text-5xl shadow-cyan-400 text-cyan-200 font-thin text-center bg-transparent border-none transition-colors duration-300 ${
                errors.name
                  ? "border-red-500 shadow-inner shadow-red-500"
                  : "border-white"
              } placeHolderName`}
              style={{ width: `${width}px`, backgroundColor: backgroundColor }}
              animate={{ width: `${width}px` }}
              transition={{ type: "just", stiffness: 500 }}
              // ... other props
            />
            {errors.name && (
              <div className="text-red-500 font-bold text-center text-xl m-4">
                {errors.name}
              </div>
            )}
          </motion.div>
        </ParallaxBanner>
      </section>
      {/* What age formik*/}
      <section ref={inViewRefAge} id="ageSection">
        <ParallaxBanner
          layers={[background, childsAgeHeadline, foreground, gradientOverlay]}
          className="aspect-[2/1] bg-gray-900 h-screen ">
          <motion.div className="m-auto relative top-1/2 flex justify-center items-center flex-col w-full">
            <div className="w-max pb-16 mobile:text-4xl tablet:text-5xl desktop:text-5xl text-cyan-200 font-thin text-center">
              {age}{" "}
              <span className="whitespace-nowrap">{`Year${
                age === 1 ? "" : "s"
              } old`}</span>
            </div>
            <div className="mx-4 w-11/12">
              <Box
                sx={{
                  boxShadow: 10,
                  borderRadius: 2,
                  p: 2,
                  minWidth: 310,
                  width: "100%",
                  display: "flex",
                }}>
                <Slider
                  size="medium"
                  aria-label="age of child"
                  defaultValue={+age || 1}
                  marks={marks}
                  max={12}
                  min={1}
                  onChange={customHandleAgeChange}
                  name="age"
                />
              </Box>
            </div>
          </motion.div>
        </ParallaxBanner>
      </section>
      {/* What is the gender formik */}
      <section ref={inViewRefGender} id="genderSection">
        <ParallaxBanner
          layers={[
            background,
            childsGenderHeadline,
            foreground,
            gradientOverlay,
          ]}
          className="aspect-[2/1] bg-gray-900 h-screen ">
          <motion.div
            ref={genderRef}
            className="m-auto relative top-1/2 flex justify-center items-center flex-col w-64">
            <div className="w-max pb-16 mobile:text-4xl tablet:text-5xl desktop:text-5xl text-cyan-200 font-thin text-center">
              <div className="flex mr-4">
                {radioOptions.map((option) => (
                  <motion.label
                    key={option}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center flex-row">
                    <motion.input
                      type="radio"
                      name={"gender"}
                      value={option}
                      onChange={customHandleGenderChange}
                      checked={formik.values.gender === option}
                      className="m-4"
                    />
                    {option}
                  </motion.label>
                ))}
              </div>
              {genderSectionInView && !formik.values.gender && (
                <div className="text-red-500 font-bold text-center text-xl m-4">
                  {errors.gender}
                </div>
              )}
            </div>
          </motion.div>
        </ParallaxBanner>
      </section>
      {/* What is the story */}
      <section ref={inViewRefStory} id="storySection">
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
                  defaultValue={story.length >= 30 ? story : ""}
                  onChange={customHandleStoryChange}
                  name="story"
                  rows={4}
                  required={true}
                  minLength={10}
                  maxLength={140}
                  placeholder={defaultStoryText}
                  className={`placeholder:text-cyan-200 form-textarea hover:placeholder-cyan-100 mobile:text-3xl tablet:text-4xl desktop:text-5xl text-cyan-200 font-thin text-center bg-transparent border-b-2 border-none focus:outline-none .placeHolderName p-4 w-auto ${
                    errors.story
                      ? "border-red-500 shadow-inner drop-shadow-2xl border-8 shadow-red-500"
                      : ""
                  } `}
                />
              </motion.div>
              {errors.story && (
                <div className="text-red-500 font-bold text-center text-xl m-4 pt-4 relative bottom-[100px]">
                  {errors.story}
                </div>
              )}
            </div>
          </motion.div>
        </ParallaxBanner>
      </section>
      {/* Let's go! */}
      <section ref={inViewRefSubmit} id="submitSection">
        <ParallaxBanner
          layers={[backgroundFull, getStartedHeadline, foreground]}
          className="aspect-[2/1] bg-black h-screen ">
          <div className="w-36 h-44 m-auto relative top-1/2 flex flex-col justify-center items-center">
            <button
              onClick={handleNavigation}
              type="button"
              title="Get Started Button"
              className={`top-11 relative cursor-pointer select-none ${
                hasErrors ? `-rotate-90` : ``
              }`}>
              <GetStartedAnimation />
            </button>
            {hasErrors ? (
              <div className="mt-4 text-md text-gray-600 italic whitespace-nowrap">
                {`Click to go to ${determineErrorSection()}`}
              </div>
            ) : null}
          </div>
        </ParallaxBanner>
      </section>
    </form>
  );
};

export default StoryDetailComp;
