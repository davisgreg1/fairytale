import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book",
  description: "Your requested fAIry tale.",
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
