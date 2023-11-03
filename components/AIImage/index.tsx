"use client";
import useImageGenerator from "@/hooks/useGetImageAI";

type AIImageProps = {
  prompt: string;
};
const AIImage = (props: AIImageProps) => {
  const { prompt } = props;
  const { imgs, loading, generateImg } = useImageGenerator(prompt);

  return (
    <div>
      <h1>Text to image</h1>
      <button onClick={generateImg} disabled={loading}>
        {loading ? "Generating..." : "Click to generate image"}
      </button>
      <div className={`mt-4`}>
        {imgs.map((img, index) => {
          return (
            <img
              key={index}
              src={img}
              alt={`Generated content ${index}`}
              crossOrigin="anonymous"
              referrerPolicy="origin-when-cross-origin"
              style={{ objectFit: "cover" }} // Adjust size as needed
            />
          );
        })}
      </div>
    </div>
  );
};

export default AIImage;
