import { classNames } from "shared/lib/classNames/classNames";
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll";
import { memo, MutableRefObject, useRef } from "react";
import cls from "./Page.module.scss";

interface PageProps {
  className?: string;
  children?: React.ReactNode;
  onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
  const { className, onScrollEnd, children } = props;

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  return (
    <section className={classNames(cls.Page, {}, [className])} ref={wrapperRef}>
      {children}
      <div ref={triggerRef} />
    </section>
  );
});
