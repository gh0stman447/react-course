import { classNames } from "shared/lib/classNames/classNames";
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { memo, MutableRefObject, useRef } from "react";
import cls from "./Page.module.scss";
import { getScrollSaveByPath, scrollSaveActions } from "features/ScrollSave";
import { useLocation } from "react-router-dom";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider";
import { useThrottle } from "shared/lib/hooks/useThrottle";

interface PageProps {
  className?: string;
  children?: React.ReactNode;
  onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
  const { className, onScrollEnd, children } = props;

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useSelector((state: StateSchema) => getScrollSaveByPath(state, pathname));

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  const onScroll = useThrottle((e: React.UIEvent<HTMLDivElement>) => {
    dispatch(scrollSaveActions.setScrollPosition({ path: pathname, position: e.currentTarget.scrollTop }));
  }, 500);
  return (
    <section className={classNames(cls.Page, {}, [className])} ref={wrapperRef} onScroll={onScroll}>
      {children}
      <div ref={triggerRef} />
    </section>
  );
});
