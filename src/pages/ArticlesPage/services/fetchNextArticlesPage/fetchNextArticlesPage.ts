import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNum,
} from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../model/articlesPageSlice";
import { fetchArciticlesList } from "../fetchArciticlesList";

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  "profile/fetchNextArticlesPage",
  async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const hasMore = getArticlesPageHasMore(getState());
    const page = getArticlesPageNum(getState());
    const isLoading = getArticlesPageIsLoading(getState());

    if (hasMore && !isLoading) {
      dispatch(articlesPageActions.setPage(page + 1));
      dispatch(fetchArciticlesList({ page: page + 1 }));
    }
  },
);
