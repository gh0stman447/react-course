import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import cls from "./Skeleton.module.scss";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  border?: string | number;
}

export const Skeleton = memo((props: SkeletonProps) => {
  const {
    className, border, height, width,
  } = props;
  const { t } = useTranslation();

  const styles: React.CSSProperties = {
    width,
    height,
    borderRadius: border,
  };

  return <div className={classNames(cls.Skeleton, {}, [className])} style={styles} />;
});
