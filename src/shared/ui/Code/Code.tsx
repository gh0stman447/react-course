import { classNames } from "shared/lib/classNames/classNames";
import { memo, useCallback, useState } from "react";
import cls from "./Code.module.scss";
import { Button, ButtonTheme } from "../Button/Button";
import CopyIcon from "../../assets/icons/copy.svg";
import DoneIcon from "../../assets/icons/done.svg";

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = memo((props: CodeProps) => {
  const { className, text } = props;
  const [isCopyed, setIsCopyed] = useState(false);

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setIsCopyed(true);

    setTimeout(() => {
      setIsCopyed(false);
    }, 1000);
  }, [text]);

  const IconToShow = !isCopyed ? (
    <CopyIcon className={cls.copyIcon} onClick={onCopy} />
  ) : (
    <DoneIcon className={cls.copyIcon} />
  );

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button className={cls.copyBtn} theme={ButtonTheme.CLEAR}>
        {/* <Icon Svg={CopyIcon} /> */}
        {IconToShow}
      </Button>
      <code>{text}</code>
    </pre>
  );
});
