import { classNames, Mods } from "shared/lib/classNames/classNames";
import React, { InputHTMLAttributes, memo, useRef } from "react";
import cls from "./Input.module.scss";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "readOnly">;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  readonly?: boolean;
}
export const Input = memo((props: InputProps) => {
  const {
    className, value, onChange, type = "text", placeholder, autoFocus, readonly, ...otherProps
  } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = React.useState(false);
  const [caretPisition, setCaretPosition] = React.useState(0);

  const isCaretVisible = isFocused && !readonly;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setCaretPosition(e.target.value.length);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaretPosition(e.target.selectionStart || 0);
  };

  React.useEffect(() => {
    if (autoFocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
  }, [autoFocus]);

  const mods: Mods = {
    [cls.readonly]: readonly,
  };

  return (
    <div className={classNames(cls.InputWrapper, mods, [className])}>
      {placeholder && <div className={cls.placeholder}>{`${placeholder} >`}</div>}
      <div className={cls.caretWrapper}>
        {isCaretVisible && <span className={cls.caret} style={{ left: `${caretPisition * 9}px` }} />}
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChangeHandler}
          className={cls.input}
          onFocus={onFocus}
          onBlur={onBlur}
          onSelect={onSelect}
          readOnly={readonly}
          {...otherProps}
        />
      </div>
    </div>
  );
});
