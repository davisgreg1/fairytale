import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
