import StoryComponent from "@/components/StoryComponent";
import TopNav from "@/components/TopNav";
import { getBedtimeStory } from "@/server/actions";
import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";
import { Suspense } from "react";

export default async function Story() {
  const queryClient = new QueryClient();
  const queryOptions = {
    story: '',
    name: '',
    age: '',
    gender: ''
  };
  await queryClient.prefetchQuery({
    queryKey: ["bedTimeStory"],
    queryFn: () => getBedtimeStory(queryOptions),
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TopNav />
        <StoryComponent />
      </HydrationBoundary>
    </Suspense>
  );
}
