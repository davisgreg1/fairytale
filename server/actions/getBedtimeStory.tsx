import axios from "axios";

type Options = {
  prompt: string;
};

const getBedtimeStory = async (options: Options) => {
  const { prompt } = options;
  try {
    if (prompt) {
      const res = await axios.post("/api/story", {
        inputText: prompt,
        email: "davisgreg1@gmail.com",
      });
      return res;
    }
  } catch (error) {
    console.log(
      "GREG LOOK!  ~ file: getBedtimeStory.tsx:12 ~ getBedtimeStory ~ error:",
      error,
    );
  }
};

export default getBedtimeStory;
