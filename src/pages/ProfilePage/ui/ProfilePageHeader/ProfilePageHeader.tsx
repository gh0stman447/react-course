import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";
import { useSelector } from "react-redux";
import { getProfileReadonly, proifleActions, updateProfileData } from "entities/Profile";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { useCallback } from "react";
import { getUserAuthData } from "entities/User";
import { useParams } from "react-router-dom";
import cls from "./ProfilePageHeader.module.scss";

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const readonly = useSelector(getProfileReadonly);
  const dispatch = useAppDispatch();

  const currentUser = useSelector(getUserAuthData);

  const onEdit = useCallback(() => {
    dispatch(proifleActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(proifleActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  const canEditProfile = currentUser?.id === id;

  const editButton = readonly ? (
    <Button theme={ButtonTheme.OUTLINE} className={cls.editBtn} onClick={onEdit}>
      {t("Редактировать")}
    </Button>
  ) : (
    <>
      <Button theme={ButtonTheme.OUTLINE_RED} className={cls.editBtn} onClick={onCancelEdit}>
        {t("Отменить")}
      </Button>
      <Button theme={ButtonTheme.OUTLINE} className={cls.saveBtn} onClick={onSave}>
        {t("Сохранить")}
      </Button>
    </>
  );

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t("Профиль")} />
      {canEditProfile && editButton}
    </div>
  );
};
