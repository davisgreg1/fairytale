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

interface PagePropsType {
  storyText: string;
  aiPrompt: string;
  pageNumber: number;
  imageURL: string;
  title?: string;
}
interface StoryBookProps {
  content: PagePropsType[];
}

export default function StoryBook(content: StoryBookProps) {
  const aiPageData = content?.content ?? [];
  const titleAndImagedata = aiPageData?.slice(0, 1);
  const flipBookRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(0);

  const onPage = useCallback((e: any) => {
    setPage(e.data);
  }, []);
  const { name } = useContext(ChildContext);

  const cleanTitle = (title?: string) => {
    const cleanTitleStr = title?.replace(`Title:`, "");
    const result = cleanTitleStr?.replace(/"/g, "");
    return result;
  };

  return (
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
        return (
          <Page key={page.pageNumber} number={page.pageNumber + 1}>
            <div
              className={`flex justify-center items-center relative w-full mobile:h-48 desktop:h-96`}>
              <Image
                src={page.imageURL}
                alt={"image based on story"}
                fill={true}
              />
            </div>
            <div className={`pt-2 mobile:text-xs tablet:text-sm desktop:text-2xl`}>{page.storyText}</div>
          </Page>
        );
      })}
      <PageCover>THE END</PageCover>
    </HTMLFlipBook>
  );
}
