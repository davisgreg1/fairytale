import React from "react";
import cx from "classnames";

type PagePropsType = {
  number: number;
};

const Page = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<PagePropsType>
>((props, ref) => {
  const { number, children } = props;
  const evenPage = number % 2 === 0;
  return (
    <div
      className={cx({
        page: true,
        "page-even": !evenPage,
        "page-odd": evenPage,
      })}
      ref={ref}>
      <div className="page-content">
        {/* <div className="page-image"></div> */}
        <div className="page-text">{children}</div>
        <div
          className={cx({
            "page-footer": true,
            "page-footer-even": !evenPage,
            "page-footer-odd": evenPage,
          })}>
          {number === 0 ? '' : number}
        </div>
      </div>
    </div>
  );
});

Page.displayName = "Page";

export default Page;
