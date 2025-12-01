import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { Input } from "shared/ui/Input/Input";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { DynamicModuleLoader, ReducerList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { addCommentFormActions, addCommentFormReducer } from "../../model/slice/addCommentFormSlice";
import { getAddCommentFormText } from "../../model/selectors/AddCommentFormSelectors";
import cls from "./AddCommentForm.module.scss";

interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

export const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation();
  const text = useSelector(getAddCommentFormText);
  const dispatch = useAppDispatch();

  const reducers: ReducerList = {
    addCommentForm: addCommentFormReducer,
  };

  const onCommentTextChange = useCallback(
    (text: string) => {
      dispatch(addCommentFormActions.setText(text));
    },
    [dispatch],
  );

  const onSendCommentClick = useCallback(() => {
    onCommentTextChange("");
    onSendComment(text || "");
  }, [onSendComment, text, onCommentTextChange]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.AddCommentForm, {}, [className])}>
        <Input
          className={cls.input}
          placeholder={t("Введите текст комментария")}
          value={text}
          onChange={onCommentTextChange}
        />
        <Button theme={ButtonTheme.OUTLINE} onClick={onSendCommentClick}>
          {t("Отправить")}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
});
