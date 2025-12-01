import { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Text } from "shared/ui/Text/Text";
import { ArticleDetails } from "entities/Article";
import { AddCommentForm } from "features/AddCommentForm";
import { CommentList } from "entities/Comment";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { DynamicModuleLoader, ReducerList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { getArticleCommentsError, getArticleCommentsIsLoading } from "../model/selectors/comments";
import { fetchCommentsByArticleId } from "../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { addCommentForArticle } from "../model/services/addCommentForArticle/addCommentForArticle";
import { articleDetailsCommentsReducer, getArticleComments } from "../model/slices/articleDetailsCommentsSlice";
import cls from "./ArticleDetailsPage.module.scss";

interface ArticlesDetailsPageProps {
  className?: string;
}

const reducers: ReducerList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = (props: ArticlesDetailsPageProps) => {
  const { className } = props;
  const { t } = useTranslation("article-details");
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const comments = useSelector(getArticleComments.selectAll);
  const isLoading = useSelector(getArticleCommentsIsLoading);
  const error = useSelector(getArticleCommentsError);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch],
  );

  if (!id) {
    return <div className={classNames(cls.ArticlesDetailsPage, {}, [className])}>{t("Статья не найдена")}</div>;
  }

  if (error) {
    return (
      <div className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
        <Text title={t("Ошибка")} />
      </div>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
        <ArticleDetails id={id} />
        <Text title={t("Комментарии")} className={cls.commentsTitle} />
        <AddCommentForm className={cls.commentForm} onSendComment={onSendComment} />
        <CommentList comments={comments} isLoading={isLoading} />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
