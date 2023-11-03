import AIImage from "@/components/AIImage";

export default function Home() {
  const prompt = `1 little young boy with kinky hair sitting in a field of green plants and flowers, 
    his hand under his chin, warm lighting, dressed like a ninja, 
    blurry foreground`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AIImage prompt={prompt} />
    </main>
  );
}
