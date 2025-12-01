import { classNames } from "shared/lib/classNames/classNames";
import { memo } from "react";
import { Comment } from "entities/Comment/model/types/comment";
import { useTranslation } from "react-i18next";
import { Text } from "shared/ui/Text/Text";
import { CommentCard } from "../CommentCard/CommentCard";
import cls from "./CommentList.module.scss";

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, isLoading, comments } = props;
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentList, {}, [className])}>
        {Array.from({ length: 3 }).map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <CommentCard key={i} isLoading />
        ))}
      </div>
    );
  }

  if (!comments?.length) {
    return (
      <div className={classNames(cls.CommentList, {}, [className])}>
        <Text text={t("Комментарии отсутствуют")} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
});
