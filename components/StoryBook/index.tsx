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
}
interface StoryBookProps {
  content: PagePropsType[];
}

export default function StoryBook(content: StoryBookProps) {
  const aiPageData = content?.content ?? [];
  const flipBookRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(0);

  const onPage = useCallback((e: any) => {
    setPage(e.data);
  }, []);
  const { name } = useContext(ChildContext);

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
      <PageCover>{`A fairy tale for ${name}`}</PageCover>
      {aiPageData.map((page) => {
        return (
          <Page key={page.pageNumber} number={page.pageNumber}>
            <div className={`flex justify-center items-center relative w-full mobile:h-48 tablet:h-96 desktop:h-96`}>
              <Image
                src={page.imageURL}
                alt={"image based on story"}
                fill={true}
              />
            </div>
            <div className={`pt-2`}>{page.storyText}</div>
          </Page>
        );
      })}
      <PageCover>THE END</PageCover>
    </HTMLFlipBook>
  );
}
