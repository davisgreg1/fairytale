import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Page from "@/components/Page";
import PageCover from "@/components/PageCover";
import HTMLFlipBook from "react-pageflip";
import { ChildContext } from "@/contexts/childContext";

interface StoryBookProps {
  content: string;
}

export default function StoryBook(content: StoryBookProps) {
  const flipBookRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(0);

  const onPage = useCallback((e: any) => {
    setPage(e.data);
  }, []);
  const { name } = useContext(ChildContext);

  const singlePages = content.content.split("\n\nPrompt: ");
  const aiGenerations = singlePages.map((page) => {
    return page.split("\n\n");
  })[0];
  const getPageData = () => {
    let pageData = [];
    for (let i = 0; i < aiGenerations.length; i++) {
      let slicedArr = aiGenerations.splice(i, 2);
      pageData.push({
        pageNumber: i,
        storyText: slicedArr[0]?.includes('Generate') ? slicedArr[1]: slicedArr[0],
        aiPrompt: slicedArr[1]?.includes('Generate') ? slicedArr[1]: slicedArr[0],
      });
    }
    return pageData;
  };

  const aiPageData = getPageData();

  return (
    <div>
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
              {page.storyText}
              {/* {page.aiPrompt} */}
            </Page>
          );
        })}
        <PageCover>THE END</PageCover>
      </HTMLFlipBook>
    </div>
  );
}
