// import prisma from "@/lib/prisma";
// import { getTokens } from "@/lib/tokenizer";

export default async function fireGenerateStoryApi(
  inputText: string,
  email: string,
) {
  const maxTokenCount = 600;
  try {
    const DEFAULT_PARAMS = {
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: inputText,
        },
      ],
      temperature: 0.5,
      max_tokens: maxTokenCount,
      top_p: 0.3,
      frequency_penalty: 0.5,
      presence_penalty: 0,
      user: email,
    };
    const params_ = { ...DEFAULT_PARAMS };
    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        "OpenAI-Organization": "org-m76qyCFYpYWzG6DmbhktUOYo",
      },
      body: JSON.stringify(params_),
    };

    // let tokenCount = getTokens(inputText);
    const moderationOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        "OpenAI-Organization": "org-m76qyCFYpYWzG6DmbhktUOYo",
      },
      body: JSON.stringify({ input: inputText }),
    };

    const moderationsRes = await fetch(
      "https://api.openai.com/v1/moderations",
      moderationOptions,
    );
    const moderationData = await moderationsRes.json();

    const [results] = moderationData.results;

    if (results.flagged) {
      // await prisma.user.update({
      //   where: {
      //     email: email,
      //   },
      //   data: {
      //     banned: true,
      //   },
      // });
      // return {
      //   error:
      //     "Your input has been flagged by the AI and you are banned. Do better.",
      // };
    } else {
      const data = await fetch(
        "https://api.openai.com/v1/chat/completions",
        requestOptions,
      );
      const response = await data.json();

      return response;
    }
  } catch (error) {
    return error;
  }
}
