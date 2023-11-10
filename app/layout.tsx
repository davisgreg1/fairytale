import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChildContextProvider from "@/contexts/childContext";
import ReactQueryProvider from "@/contexts/ReactQueryProvider";
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fAIry tale",
  description: "fAIry tale is a story by you, for you, with AI.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ReactQueryProvider>
            <ChildContextProvider>{children}</ChildContextProvider>
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
