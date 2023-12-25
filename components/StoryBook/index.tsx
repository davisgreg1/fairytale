import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Page from "@/components/Page";
import PageCover from "@/components/PageCover";
import HTMLFlipBook from "react-pageflip";
import { ChildContext } from "@/contexts/childContext";
import NextAnimation from "../NextAnimation";
import PreviousAnimation from "../PreviousAnimation";
import { useRouter } from "next/navigation";

interface PagePropsType {
  storyText: string;
  aiPrompt: string;
  pageNumber: string;
  imageURL: string;
  title?: string;
}
interface StoryBookProps {
  content: PagePropsType[];
  isFetchingImages: boolean;
  isFetching: boolean;
}

export default function StoryBook({
  content,
  isFetching,
  isFetchingImages,
}: StoryBookProps) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const aiPageData = content ?? [];

  const aiPageDataLength = aiPageData.length;
  const lastPage = aiPageDataLength === page;

  const titleAndImagedata = aiPageData?.slice(0, 1);
  const flipBookRef = useRef<any>(null);

  const [totalPageCount, setTotalPageCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  const onPage = useCallback((e: any) => {
    setPage(e.data);
  }, []);
  const { name } = useContext(ChildContext);

  const cleanTitle = (title?: string) => {
    const cleanTitleStr = title?.replace(`Title:`, "");
    const result = cleanTitleStr?.replace(/"/g, "");
    return result;
  };

  useEffect(() => {
    if (flipBookRef && flipBookRef.current) {
      setTotalPageCount(flipBookRef?.current?.pageFlip().getPageCount());
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  const nextButtonClick = () => {
    if (flipBookRef && flipBookRef.current) {
      flipBookRef?.current?.pageFlip().flipNext();
    }
  };
  const prevButtonClick = () => {
    if (flipBookRef && flipBookRef.current) {
      flipBookRef?.current?.pageFlip().flipPrev();
    }
  };

  const handleNavigateToStoryDetails = () => {
    router.push("/storyDetails");
  };

  return (
    <div className="flex flex-col h-[100svh] justify-center items-center">
      {mounted ? (
        <>
          <HTMLFlipBook
            ref={flipBookRef}
            className={"demo-book"}
            width={550}
            height={600}
            size="stretch"
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={onPage}
            startPage={0}
            drawShadow={true}
            startZIndex={0}
            autoSize={true}
            style={{ margin: "auto" }}
            renderOnlyPageLengthChange={true}
            flippingTime={1000}
            usePortrait={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={0}
            showPageCorners={true}
            disableFlipByClick={false}>
            <PageCover>
              {" "}
              <div className={``}>
                <Image
                  className=""
                  src={titleAndImagedata[0].imageURL}
                  alt={"image based on story"}
                  fill={true}
                />
              </div>
              <div
                className={`pt-4 absolute w-full left-0 text-center font-medium mobile:text-xs tablet:text-sm desktop:text-2xl top-0 text-[#FBFAF5] backdrop-blur-sm`}>
                {cleanTitle(titleAndImagedata[0].title)}
              </div>
            </PageCover>
            {aiPageData.map((page) => {
              const pageNumber = +page.pageNumber
                .split(" ")[1]
                .replace(`:`, "")[0];
              return (
                <Page key={page.pageNumber} number={+pageNumber}>
                  <div
                    className={`flex justify-center items-center relative w-full mobile:h-48 desktop:h-96`}>
                    <Image
                      src={page.imageURL}
                      alt={"image based on story"}
                      fill={true}
                    />
                  </div>
                  <div
                    className={`pt-2 mobile:text-xs tablet:text-sm desktop:text-lg`}>
                    {pageNumber === 0 ? "" : page.storyText}
                  </div>
                </Page>
              );
            })}
            <PageCover>THE END</PageCover>
          </HTMLFlipBook>
          <div className="flex flex-col justify-center items-center">
            <div className="relative bottom-0 mx-4 flex">
              {page === 0 ? null : (
                <span onClick={prevButtonClick}>
                  <PreviousAnimation />
                </span>
              )}
              {lastPage ? null : (
                <span className="relative" onClick={nextButtonClick}>
                  <NextAnimation />
                </span>
              )}
            </div>
            <div className="flex justify-center items-center">
              <button
                disabled={isFetching || isFetchingImages}
                onClick={handleNavigateToStoryDetails}
                className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 m-16 rounded cursor-pointer disabled:bg-slate-400"
                type="button">
                {isFetching || isFetchingImages
                  ? `Getting Another Story`
                  : `Get Another Story`}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-white text-2xl">loading...</div>
      )}
    </div>
  );
}
