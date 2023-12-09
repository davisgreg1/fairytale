import { OpenAIStream, OpenAIStreamPayload } from "@/utils/OpenAIStream";

if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { story, name, age, gender } = (await req.json()) as {
    story: string;
    name: string;
    age: number | string;
    gender: string;
  };

  if (!story || !name || !age || !gender) {
    const missingParam = !story
      ? "story"
      : !name
      ? "name"
      : !age
      ? "age"
      : !gender
      ? "gender"
      : "";
    return new Response(`No ${missingParam} in the request`, { status: 400 });
  }
  const maxTokenCount = 600;

  const payload: OpenAIStreamPayload = {
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: `Generate a story about ${story}. The main character is: ${name}, age: ${age}, gender: ${gender}. Here are the rules: 1. it MUST be a 430 word bedtime fairy tale. 2.It MUST include a title and an image for the book 3.The generated image MUST come after the title 4. Each different section should have a prompt at the end for novita-sdk to generate an image. 5. The prompt MUST begin with the phrase Generate an image. 6. Each page (BEFORE the actual content) MUST be labeled as Page 1, Page 2, etc...`,
      },
    ],
    max_tokens: maxTokenCount,
    top_p: 0.3,
    frequency_penalty: 0.5,
    presence_penalty: 0,
    temperature: 0.7,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  let result = new Response(stream);
  return result;
};

export default handler;
