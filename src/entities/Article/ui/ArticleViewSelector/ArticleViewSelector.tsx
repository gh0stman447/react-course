import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { ArticleView } from "entities/Article/model/types/article";
import ListIcon from "shared/assets/icons/list.svg";
import GridIcon from "shared/assets/icons/grid.svg";
import { Icon } from "shared/ui/Icon/Icon";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import cls from "./ArticleViewSelector.module.scss";

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick: (view: ArticleView) => void;
}

const viewTypes: Array<{ view: ArticleView; icon: React.VFC<React.SVGProps<SVGSVGElement>> }> = [
  {
    view: ArticleView.BIG,
    icon: ListIcon,
  },
  {
    view: ArticleView.SMALL,
    icon: GridIcon,
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props;
  const { t } = useTranslation();

  const onClick = (view: ArticleView) => () => onViewClick?.(view);

  return (
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button theme={ButtonTheme.CLEAR} onClick={onClick(viewType.view)} key={viewType.view}>
          <Icon Svg={viewType.icon} className={classNames("", { [cls.notSelected]: viewType.view !== view }, [])} />
        </Button>
      ))}
    </div>
  );
});
