import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  Article, ArticleBlockType, ArticleType, ArticleView,
} from "../../model/types/article";
import { ArticleList } from "./ArticleList";

export default {
  title: "entities/Article/ArticleList",
  component: ArticleList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => <ArticleList {...args} />;

const article: Article = {
  id: "1",
  userId: "1",
  title: "first article",
  subtitle: "subtitle of first article",
  img: "https://teknotower.com/wp-content/uploads/2020/11/js.png",
  user: { id: "1", username: "UserName" },
  views: 1022,
  createdAt: "26.02.2022",
  type: [ArticleType.IT, ArticleType.SCIENCE, ArticleType.ECONOMICS],
  blocks: [
    {
      id: "1",
      type: ArticleBlockType.TEXT,
      title: "Заголовок этого блока",
      paragraphs: [
        "Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.",
        "JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.",
        "Для того чтобы её написать, если вы пользуетесь Google Chrome, откройте меню браузера и выберите в нём команду Дополнительные инструменты > Инструменты разработчика. Окно браузера окажется разделённым на две части. В одной из них будет видна страница, в другой откроется панель с инструментами разработчика, содержащая несколько закладок. Нас интересует закладка Console (Консоль). Щёлкните по ней. Не обращайте внимания на то, что уже может в консоли присутствовать (для её очистки можете воспользоваться комбинацией клавиш Ctrl + L). Нас сейчас интересует приглашение консоли. Именно сюда можно вводить JavaScript-код, который выполняется по нажатию клавиши Enter. Введём в консоль следующее:",
      ],
    },
    {
      id: "2",
      type: ArticleBlockType.CODE,
      code: "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);",
    },
    {
      id: "3",
      type: ArticleBlockType.TEXT,
      title: "Заголовок этого блока",
      paragraphs: [
        "Этот текст можно ввести с клавиатуры, можно скопировать и вставить его в консоль. Результат будет одним и тем же, но, если вы учитесь программировать, рекомендуется вводить тексты программ самостоятельно, а не копировать их.",
      ],
    },
    {
      id: "4",
      type: ArticleBlockType.IMAGE,
      src: "https://habrastorage.org/r/w1560/getpro/habr/upload_files/25b/98f/0e7/25b98f0e7c9a7d1d3a67a2754783d7b3.jpeg",
      title: "Рисунок 1 - скриншот сайта",
    },
    {
      id: "5",
      type: ArticleBlockType.CODE,
      code: "server.use((req, res, next) => {\n  if (req.method === 'POST') {\n    req.body.createdAt = Date.now();\n  }\n  // Continue to JSON Server router\n  next();\n});\n\nserver.use('/api', router);\n\nserver.listen(8000, () => {\n  console.log('JSON Server is running');\n});",
    },
    {
      id: "8",
      type: ArticleBlockType.TEXT,
      title: "Заголовок этого блока",
      paragraphs: [
        "JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.",
        "Для того чтобы её написать, если вы пользуетесь Google Chrome, откройте меню браузера и выберите в нём команду Дополнительные инструменты > Инструменты разработчика. Окно браузера окажется разделённым на две части. В одной из них будет видна страница, в другой откроется панель с инструментами разработчика, содержащая несколько закладок. Нас интересует закладка Console (Консоль). Щёлкните по ней. Не обращайте внимания на то, что уже может в консоли присутствовать (для её очистки можете воспользоваться комбинацией клавиш Ctrl + L). Нас сейчас интересует приглашение консоли. Именно сюда можно вводить JavaScript-код, который выполняется по нажатию клавиши Enter. Введём в консоль следующее:",
      ],
    },
    {
      id: "9",
      type: ArticleBlockType.CODE,
      code: "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);",
    },
    {
      id: "10",
      type: ArticleBlockType.IMAGE,
      src: "https://habrastorage.org/r/w1560/getpro/habr/upload_files/25b/98f/0e7/25b98f0e7c9a7d1d3a67a2754783d7b3.jpeg",
      title: "Рисунок 1 - скриншот сайта",
    },
    {
      id: "11",
      type: ArticleBlockType.TEXT,
      title: "Заголовок этого блока",
      paragraphs: [
        "Для того чтобы её написать, если вы пользуетесь Google Chrome, откройте меню браузера и выберите в нём команду Дополнительные инструменты > Инструменты разработчика. Окно браузера окажется разделённым на две части. В одной из них будет видна страница, в другой откроется панель с инструментами разработчика, содержащая несколько закладок. Нас интересует закладка Console (Консоль). Щёлкните по ней. Не обращайте внимания на то, что уже может в консоли присутствовать (для её очистки можете воспользоваться комбинацией клавиш Ctrl + L). Нас сейчас интересует приглашение консоли. Именно сюда можно вводить JavaScript-код, который выполняется по нажатию клавиши Enter. Введём в консоль следующее:",
      ],
    },
  ],
};

export const isLoadingBig = Template.bind({});

isLoadingBig.args = {
  isLoading: true,
  articles: [],
  view: ArticleView.BIG,
};

export const isLoadingSmall = Template.bind({});

isLoadingSmall.args = {
  isLoading: true,
  articles: [],
  view: ArticleView.SMALL,
};

export const listBig = Template.bind({});

listBig.args = {
  isLoading: false,
  articles: new Array(9).fill(0).map((item, index) => ({
    ...article,
    id: String(index),
  })),
  view: ArticleView.BIG,
};

export const listSmall = Template.bind({});

listSmall.args = {
  isLoading: false,
  articles: new Array(9).fill(0).map((item, index) => ({
    ...article,
    id: String(index),
  })),
  view: ArticleView.SMALL,
};
