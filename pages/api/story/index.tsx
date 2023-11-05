import { OpenAIStream, OpenAIStreamPayload } from "@/utils/OpenAIStream";

if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { inputText } = (await req.json()) as {
    inputText: string;
  };

  if (!inputText) {
    return new Response("No prompt in the request", { status: 400 });
  }
  const maxTokenCount = 600;

  const payload: OpenAIStreamPayload = {
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: inputText,
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
  return new Response(stream);
};

export default handler;
