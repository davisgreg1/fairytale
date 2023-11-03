import { decode, encode } from "gpt-3-encoder";

export function getTokens(input: string): number {
  const tokens = encode(input);
  console.log(
    "GREG LOOK!  ~ file: tokenizer.tsx:31 ~ getTokens ~ tokens:",
    tokens,
    "and the length:",
    tokens.length,
    "and decoded:",
    decode(tokens),
  );
  return tokens.length;
}
