import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { memo, useCallback } from "react";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { DynamicModuleLoader, ReducerList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginLoading } from "../../model/selectors/getLoginLoading/getLoginLoading";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { loginActions, loginReducer } from "../../model/slice/loginSlice";
import cls from "./LoginForm.module.scss";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import { useAppDispatch } from "../../../../shared/lib/hooks/useAppDispatch";

export interface LoginFormProps {
  className?: string;
  onSuccess?: () => void;
}

const initialReducers: ReducerList = { loginForm: loginReducer };

const LoginForm = memo((props: LoginFormProps) => {
  const { className, onSuccess } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginLoading);
  const error = useSelector(getLoginError);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));
    if (result.meta.requestStatus === "fulfilled") {
      onSuccess();
    }
  }, [dispatch, username, password, onSuccess]);

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Text title={t("Форма авторизации")} />
        {error && <Text text={t("Вы ввели неверный логин или пароль")} theme={TextTheme.ERROR} />}
        <Input
          type="text"
          className={cls.input}
          placeholder={t("Введите логин")}
          autoFocus
          onChange={onChangeUsername}
          value={username}
        />
        <Input
          type="text"
          className={cls.input}
          placeholder={t("Введите пароль")}
          onChange={onChangePassword}
          value={password}
        />
        <Button className={cls.loginBtn} theme={ButtonTheme.OUTLINE} onClick={onLoginClick} disabled={isLoading}>
          {t("Войти")}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
});

export default LoginForm;
