import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChildContextProvider from "@/contexts/childContext";
import Provider from "@/contexts/sessionProvider";
import ReactQueryProvider from "@/contexts/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fAIry tale",
  description: "fAIry tale is a story by you, for you, with AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <Provider>
            <ChildContextProvider>{children}</ChildContextProvider>
          </Provider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
