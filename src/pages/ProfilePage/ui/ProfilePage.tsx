import { useTranslation } from "react-i18next";
import { DynamicModuleLoader, ReducerList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  fetchProfileData,
  getProfileError,
  getProfileForm,
  getProfileLoading,
  getProfileReadonly,
  getProfileValidateErrors,
  ProfileCard,
  proifleActions,
  profileReducer,
  ValidateProfileError,
} from "entities/Profile";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { Currency } from "entities/Currnecy";
import { Country } from "entities/Country";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader";

const reducers: ReducerList = {
  profile: profileReducer,
};

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = (props: ProfilePageProps) => {
  const { className } = props;
  const { t } = useTranslation("profile");
  const dispatch = useAppDispatch();

  const formData = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileLoading);
  const error = useSelector(getProfileError);
  const isReadonly = useSelector(getProfileReadonly);
  const validateErrors = useSelector(getProfileValidateErrors);

  const validateErrorTranslates = {
    [ValidateProfileError.SERVER_ERROR]: t("Серверная ошибка при сохранении"),
    [ValidateProfileError.INCORRECT_COUNTRY]: t("Некорректный регион"),
    [ValidateProfileError.NO_DATA]: t("Данные не указаны"),
    [ValidateProfileError.INCORRECT_USER_DATA]: t("Имя и фамилия обязательны"),
    [ValidateProfileError.INCORRECT_AGE]: t("Некорректный возраст"),
  };

  useEffect(() => {
    if (__PROJECT__ !== "storybook") {
      dispatch(fetchProfileData());
    }
  }, [dispatch]);

  const onChangeFirstName = useCallback(
    (value?: string) => {
      dispatch(proifleActions.updateProfile({ first: value || "" }));
    },
    [dispatch],
  );

  const onChangeLastName = useCallback(
    (value?: string) => {
      dispatch(proifleActions.updateProfile({ lastname: value || "" }));
    },
    [dispatch],
  );

  const onChangeCity = useCallback(
    (value?: string) => {
      dispatch(proifleActions.updateProfile({ city: value || "" }));
    },
    [dispatch],
  );

  const onChangeAge = useCallback(
    (value?: string) => {
      dispatch(proifleActions.updateProfile({ age: Number(value) || 0 }));
    },
    [dispatch],
  );

  const onChangeUsername = useCallback(
    (value?: string) => {
      dispatch(proifleActions.updateProfile({ username: value || "" }));
    },
    [dispatch],
  );

  const onChangeAvatar = useCallback(
    (value?: string) => {
      dispatch(proifleActions.updateProfile({ avatar: value || "" }));
    },
    [dispatch],
  );

  const onChangeCurrency = useCallback(
    (value?: Currency) => {
      dispatch(proifleActions.updateProfile({ currency: value || Currency.USD }));
    },
    [dispatch],
  );

  const onChangeCountry = useCallback(
    (value?: Country) => {
      dispatch(proifleActions.updateProfile({ country: value || Country.Russia }));
    },
    [dispatch],
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <ProfilePageHeader />
      {validateErrors?.length
        && validateErrors.map((err) => <Text theme={TextTheme.ERROR} text={validateErrorTranslates[err]} key={err} />)}
      <ProfileCard
        data={formData}
        isLoading={isLoading}
        error={error}
        readonly={isReadonly}
        onChangeFirstName={onChangeFirstName}
        onChangeLastName={onChangeLastName}
        onChangeAge={onChangeAge}
        onChangeCity={onChangeCity}
        onChangeAvatar={onChangeAvatar}
        onChangeUsername={onChangeUsername}
        onChangeCurrency={onChangeCurrency}
        onChangeCountry={onChangeCountry}
      />
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
