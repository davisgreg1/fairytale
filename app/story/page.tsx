import StoryComponent from "@/components/StoryComponent";
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
    prompt: "",
  };
  await queryClient.prefetchQuery({
    queryKey: ["bedTimeStory"],
    queryFn: () => getBedtimeStory(queryOptions),
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <StoryComponent />
      </HydrationBoundary>
    </Suspense>
  );
}
