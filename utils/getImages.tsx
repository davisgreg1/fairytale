import { NovitaSDK } from "novita-sdk";

export interface PageRes {
  title?: string;
  pageNumber?: string;
  storyText?: string;
  aiPrompt?: string;
  imageURL?: string;
}
export default async function getImages(storyData?: PageRes[]) {
  const NOVITA_KEY = process.env.NEXT_PUBLIC_NOVITA_KEY;
  const sdk = new NovitaSDK(NOVITA_KEY!);

  if (!storyData) {
    console.error("No story data provided");
    return;
  }

  const imagePromises = storyData.map(async (page) => {
    try {
      const params = {
        model_name: "disneyPixarCartoon_v10_48754.safetensors",
        prompt: `masterpiece, high quality best quality, ${page.aiPrompt}. Main character is black, african, very dark skinned. `,
        negative_prompt: "EasyNegative, drawn by bad-artist, sketch by bad-artist-anime, (bad_prompt:0.8), (artist name, signature, watermark:1.4), (ugly:1.2), (worst quality, poor details:1.4), bad-hands-5, badhandv4, blurry",
        width: 512,
        height: 512,
        sampler_name: "DPM++ 2M Karras",
        cfg_scale: 7.5,
        steps: 20,
        batch_size: 1,
        n_iter: 1,
        seed: -1,
      };

      const res = await sdk.txt2ImgSync(params);
      return {
        ...page,
        imageURL: res[0],
      };
    } catch (error) {
      console.error("Error processing image for page:", page, error);
      return {
        ...page,
        imageURL: undefined, // You can set a default or error image URL here
      };
    }
  });

  return Promise.all(imagePromises);
}
