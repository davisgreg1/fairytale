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
        model_name: "realcartoon3d_f16fullV30_73399.safetensors",
        prompt: `masterpiece, best quality, ultra high res, (fractal art:1.3), deep shadow, dark theme, fully clothed, necklace, forlorn, ${page.aiPrompt}. Main character is black, african, very dark skinned. MUST BE VERY COLORFUL. MUST BE AGE APPROPRIATE. MUST be in the style of Disney.`,
        negative_prompt: `(((nude))), ((naked)), ((signature)),((logo)),(((nipples))), ng_deepnegative_v1_75t, (badhandv4:1.2), (worst quality:2), (low quality:2), (normal quality:2), lowres, bad anatomy, bad hands, ((monochrome)), ((grayscale)), ((watermark)),`,
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
