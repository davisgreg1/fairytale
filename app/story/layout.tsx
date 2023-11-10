import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Story",
  description: "Your requested fAIry tale.",
};

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
