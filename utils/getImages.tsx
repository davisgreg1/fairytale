import { NovitaSDK } from "novita-sdk";

export interface PageRes {
  title?: string;
  pageNumber?: number;
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
        model_name: "CounterfeitV30_v30.safetensors",
        prompt: `(masterpiece, best quality),(illustration:1.2),(ultra-detailed:1.2),beautiful detailed eyes,
              ${page.aiPrompt}, 
              subject is black african, very dark skinned, brown. Setting is night time with full moon. MUST be in the style of Disney like characters.`,
        negative_prompt: "EasyNegativeV2",
        width: 512,
        height: 512,
        sampler_name: "DPM++ 2M Karras",
        cfg_scale: 7,
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
