import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Story Details",
  description: "Story Details",
};

export default function StoryDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
