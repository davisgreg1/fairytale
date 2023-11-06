import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ChildContextProvider from "@/contexts/childContext";
import Provider from "@/contexts/sessionProvider";

const inter = Inter({ subsets: ["latin"] });

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
