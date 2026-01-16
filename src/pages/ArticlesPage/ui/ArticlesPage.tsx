/* eslint-disable */

import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Article, ArticleList, ArticleView, ArticleViewSelector } from "entities/Article";

import cls from "./ArticlesPage.module.scss";
import { DynamicModuleLoader, ReducerList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articlePageReducer, articlesPageActions, getArticles } from "../model/articlesPageSlice";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { fetchArciticlesList } from "../services/fetchArciticlesList";
import { useSelector } from "react-redux";
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from "../selectors/articlesPageSelectors";

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducerList = {
  articlesPage: articlePageReducer,
};

const article = {
  id: "1",
  userId: "1",
  title: "first article",
  subtitle: "subtitle of first article",
  img: "https://teknotower.com/wp-content/uploads/2020/11/js.png",
  views: 1022,
  createdAt: "26.02.2022",
  user: {
    id: "1",
    username: "UserName",
    avatar: "https://t3.ftcdn.net/jpg/05/17/16/90/360_F_517169024_GfRSDlJPnQUydJBhRHTnOSOqgnTHHKYl.jpg",
  },
  type: ["IT", "SCIENCE", "ECONOMICS", "POLITICS", "SPORT"],
  blocks: [
    {
      id: "1",
      type: "TEXT",
      title: "Заголовок этого блока",
      paragraphs: [
        "Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.",
        "JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.",
        "Для того чтобы её написать, если вы пользуетесь Google Chrome, откройте меню браузера и выберите в нём команду Дополнительные инструменты > Инструменты разработчика. Окно браузера окажется разделённым на две части. В одной из них будет видна страница, в другой откроется панель с инструментами разработчика, содержащая несколько закладок. Нас интересует закладка Console (Консоль). Щёлкните по ней. Не обращайте внимания на то, что уже может в консоли присутствовать (для её очистки можете воспользоваться комбинацией клавиш Ctrl + L). Нас сейчас интересует приглашение консоли. Именно сюда можно вводить JavaScript-код, который выполняется по нажатию клавиши Enter. Введём в консоль следующее:",
      ],
    },
    {
      id: "2",
      type: "CODE",
      code: "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);",
    },
    {
      id: "3",
      type: "TEXT",
      title: "Заголовок этого блока",
      paragraphs: [
        "Этот текст можно ввести с клавиатуры, можно скопировать и вставить его в консоль. Результат будет одним и тем же, но, если вы учитесь программировать, рекомендуется вводить тексты программ самостоятельно, а не копировать их.",
      ],
    },
    {
      id: "4",
      type: "IMAGE",
      src: "https://habrastorage.org/r/w1560/getpro/habr/upload_files/25b/98f/0e7/25b98f0e7c9a7d1d3a67a2754783d7b3.jpeg",
      title: "Рисунок 1 - скриншот сайта",
    },
    {
      id: "5",
      type: "CODE",
      code: "server.use((req, res, next) => {\n  if (req.method === 'POST') {\n    req.body.createdAt = Date.now();\n  }\n  // Continue to JSON Server router\n  next();\n});\n\nserver.use('/api', router);\n\nserver.listen(8000, () => {\n  console.log('JSON Server is running');\n});",
    },
    {
      id: "8",
      type: "TEXT",
      title: "Заголовок этого блока",
      paragraphs: [
        "JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.",
        "Для того чтобы её написать, если вы пользуетесь Google Chrome, откройте меню браузера и выберите в нём команду Дополнительные инструменты > Инструменты разработчика. Окно браузера окажется разделённым на две части. В одной из них будет видна страница, в другой откроется панель с инструментами разработчика, содержащая несколько закладок. Нас интересует закладка Console (Консоль). Щёлкните по ней. Не обращайте внимания на то, что уже может в консоли присутствовать (для её очистки можете воспользоваться комбинацией клавиш Ctrl + L). Нас сейчас интересует приглашение консоли. Именно сюда можно вводить JavaScript-код, который выполняется по нажатию клавиши Enter. Введём в консоль следующее:",
      ],
    },
    {
      id: "9",
      type: "CODE",
      code: "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);",
    },
    {
      id: "10",
      type: "IMAGE",
      src: "https://habrastorage.org/r/w1560/getpro/habr/upload_files/25b/98f/0e7/25b98f0e7c9a7d1d3a67a2754783d7b3.jpeg",
      title: "Рисунок 1 - скриншот сайта",
    },
    {
      id: "11",
      type: "TEXT",
      title: "Заголовок этого блока",
      paragraphs: [
        "Для того чтобы её написать, если вы пользуетесь Google Chrome, откройте меню браузера и выберите в нём команду Дополнительные инструменты > Инструменты разработчика. Окно браузера окажется разделённым на две части. В одной из них будет видна страница, в другой откроется панель с инструментами разработчика, содержащая несколько закладок. Нас интересует закладка Console (Консоль). Щёлкните по ней. Не обращайте внимания на то, что уже может в консоли присутствовать (для её очистки можете воспользоваться комбинацией клавиш Ctrl + L). Нас сейчас интересует приглашение консоли. Именно сюда можно вводить JavaScript-код, который выполняется по нажатию клавиши Enter. Введём в консоль следующее:",
      ],
    },
  ],
} as Article;

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const articles = useSelector(getArticles.selectAll);

  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);

  const dispatch = useAppDispatch();

  useInitialEffect(() => {
    dispatch(fetchArciticlesList());
    dispatch(articlesPageActions.initState());
  });

  const onChangeView = (newView: ArticleView) => {
    dispatch(articlesPageActions.setView(newView));
  };

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.ArticlesPage, {}, [className])}>
        <ArticleViewSelector onViewClick={onChangeView} view={view} />
        <ArticleList isLoading={isLoading} articles={articles} view={view} />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
