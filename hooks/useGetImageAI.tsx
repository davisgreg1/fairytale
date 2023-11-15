"use client";
import { useState, useCallback } from "react";
import { NovitaSDK } from "novita-sdk";

type PromptType = {
  aiPrompt: string;
  pageNumber: number;
  storyText: string;
  imageURL?: string;
}[];

const useImageGenerator = (arrayOfPrompts: PromptType) => {
  const NOVITA_KEY = process.env.NEXT_PUBLIC_NOVITA_KEY;
  const sdk = new NovitaSDK(NOVITA_KEY!);

  const [imgs, setImgs] = useState<string[][]>([]);
  const [loading, setLoading] = useState(false);

  const generateImg = useCallback(async () => {
    setLoading(true);
    const imagesForAllPrompts = await Promise.all(
      arrayOfPrompts.map(async (prompt) => {
        const params = {
          model_name: "CounterfeitV30_v30.safetensors",
          prompt: `(masterpiece, best quality),(illustration:1.2),(ultra-detailed:1.2),Generate a vibrant and imaginative image that is suitable for children aged 12 and under. The image should be colorful, friendly, and engaging, capturing a sense of wonder and adventure. Avoid any themes of violence, fear, or danger. Instead, focus on depicting a cheerful and safe environment, whether it's a natural landscape, a cityscape, or a fantastical setting. Ensure that any characters in the image are portrayed in a positive and non-threatening manner, with friendly expressions and non-aggressive poses. The overall tone of the image should be uplifting, inspiring, and appropriate for a young audience. ${prompt.aiPrompt}, image is of a black african, very dark skinned, brown. Setting is night time with full moon`,
          negative_prompt: "adult, poor quality, skin, bad hands, bad face, bad fingers",
          width: 512,
          height: 512,
          sampler_name: "DPM++ 2M Karras",
          cfg_scale: 7,
          steps: 20,
          batch_size: 1,
          n_iter: 1,
          seed: -1,
        };

        try {
          const res = await sdk.txt2ImgSync(params);
          if (res && res.task_id) {
            const timer = setInterval(() => {
              sdk
                .progress({
                  task_id: res.task_id,
                })
                .then((res: any) => {
                  if (res.code == 0) {
                    if (res.status === 2) {
                      console.log("finished!", res.imgs);
                      clearInterval(timer);
                      return res.imgs;
                    }
                    if (res.status === 3 || res.status === 4) {
                      console.warn("failed!", res.failed_reason);
                      clearInterval(timer);
                      return [];
                    }
                    if (res.status === 1) {
                      console.log("progress", res.current_images);
                    }
                  }
                })
                .catch((err) => {
                  console.error("progress error:", err);
                });
            }, 1000);
          }
          return res;
        } catch (err) {
          console.error(err);
          return [];
        }
      }),
    );
    setImgs(imagesForAllPrompts);
    setLoading(false);
  }, [arrayOfPrompts]);

  return { imgs, loading, generateImg };
};

export default useImageGenerator;
