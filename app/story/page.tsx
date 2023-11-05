import StoryComponent from "@/components/StoryComponent";
import { getBedtimeStory } from "@/server/actions";
import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";

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
    <main className="flex min-h-screen flex-col items-center justify-between m-auto bg-black">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <StoryComponent />
      </HydrationBoundary>
    </main>
  );
}
