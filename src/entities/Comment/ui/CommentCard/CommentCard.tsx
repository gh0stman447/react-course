import { classNames } from "shared/lib/classNames/classNames";
import { memo } from "react";
import { Text } from "shared/ui/Text/Text";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { Comment } from "../../model/types/comment";
import cls from "./CommentCard.module.scss";

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, isLoading, comment } = props;

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
        <div className={cls.header}>
          <Skeleton border="50%" width={30} height={30} />
          <Skeleton className={cls.username} width={100} height={16} />
        </div>
        <div className={cls.text}>
          <Skeleton width="100%" height={50} />
        </div>
      </div>
    );
  }

  if (!comment) return null;

  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink className={cls.header} to={`${RoutePath.profile}${comment.user.id}`}>
        {comment.user.avatar ? <Avatar size={30} src={comment.user.avatar} /> : null}
        <Text title={comment.user.username} className={cls.username} />
      </AppLink>
      <Text title={comment.text} className={cls.text} />
    </div>
  );
});
