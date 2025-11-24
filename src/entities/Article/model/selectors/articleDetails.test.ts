import { StateSchema } from "app/providers/StoreProvider";

import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from "./articleDetails";
import { Article, ArticleType } from "../types/article";

describe("articleDetails.test", () => {
  test("should return data", () => {
    const data: Article = {
      id: "1",
      title: "Javascript news",
      subtitle: "Что нового в JS за 2022 год?",
      img: "https://teknotower.com/wp-content/uploads/2020/11/js.png",
      views: 1022,
      createdAt: "26.02.2022",
      type: [ArticleType.SCIENCE, ArticleType.IT],
      blocks: [],
      userId: "1",
    };

    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        data,
      },
    };

    expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
  });

  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
  });

  test("should return error", () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        error: "error",
      },
    };

    expect(getArticleDetailsError(state as StateSchema)).toEqual("error");
  });

  test("should work with empty state error", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined);
  });

  test("should return isLoading", () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        isLoading: true,
      },
    };

    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true);
  });

  test("should work with empty state isLoading", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(false);
  });
});
