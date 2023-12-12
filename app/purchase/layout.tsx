import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchase a story",
  description: "Purchase a story",
};

export default function PurchaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
