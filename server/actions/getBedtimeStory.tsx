import axios from "axios";

type Options = {
  story: string;
  name: string;
  age?: number | string;
  gender: string;
};

const getBedtimeStory = async (options: Options) => {
  try {
    const res = await axios.post("/api/story", {
      ...options,
      email: "davisgreg1@gmail.com",
    });
    return res;
  } catch (error) {
    console.log(
      "GREG LOOK!  ~ file: getBedtimeStory.tsx:12 ~ getBedtimeStory ~ error:",
      error,
    );
  }
};

export default getBedtimeStory;
