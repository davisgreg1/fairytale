import exp from "constants";
import React from "react";

type PageCoverPropsType = {
  number?: number;
};

const PageCover = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<PageCoverPropsType>
>((props, ref) => {
  return (
    <div className="page page-cover justify-center items-center" ref={ref} data-density="hard">
      <div className="page-content w-full h-full flex justify-center items-center">
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

PageCover.displayName = "PageCover";

export default PageCover;
