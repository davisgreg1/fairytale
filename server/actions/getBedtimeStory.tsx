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
    });
    return res;
  } catch (error: any) {
    if (error.cause instanceof AggregateError) {
      console.log("Handling AggregateError with multiple errors:");
      for (const individualError of error.errors) {
        // Handle each individual error
        console.log("individualError", individualError);
      }
    }
    console.log(
      "GREG LOOK! ~ file: getBedtimeStory.tsx:12 ~ getBedtimeStory ~ error:",
      error,
    );
  }
};

export default getBedtimeStory;
