import axios from "axios";

type Options = {
  prompt: string;
};

const getImageForPage = async (options: Options) => {
  const { prompt } = options;
  try {
    if (prompt) {
      const res = await axios.post("/api/getImages", {
        prompt: prompt,
      });
      return res;
    }
  } catch (error) {
  }
};

export default getImageForPage;
