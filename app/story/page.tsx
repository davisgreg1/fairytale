import { Suspense } from "react";
import StoryComponent from "@/components/StoryComponent";
import TopNav from "@/components/TopNav";

export default async function Story() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TopNav />
      <StoryComponent />
    </Suspense>
  );
}
