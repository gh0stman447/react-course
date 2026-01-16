import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from "shared/const/localStorage";
import { Article, ArticleView } from "entities/Article";
import { ArticlesPageSchema } from "../types/articlesPageSchema";
import { fetchArciticlesList } from "../services/fetchArciticlesList";

const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

export const articlesPageSlice = createSlice({
  name: "articlesPageSlice",
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    entities: {},
    ids: [],
    view: ArticleView.SMALL,
    error: undefined,
    isLoading: false,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    initState: (state) => {
      state.view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchArciticlesList.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(fetchArciticlesList.fulfilled, (state, action: PayloadAction<Article[]>) => {
      state.isLoading = false;
      articlesAdapter.setAll(state, action.payload);
    });
    builder.addCase(fetchArciticlesList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { reducer: articlePageReducer, actions: articlesPageActions } = articlesPageSlice;

export default articlesPageSlice.reducer;
