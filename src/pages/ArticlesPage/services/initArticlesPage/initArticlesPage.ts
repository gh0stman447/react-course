import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { articlesPageActions } from "pages/ArticlesPage/model/articlesPageSlice";
import { getArticlesPageInited } from "pages/ArticlesPage/selectors/articlesPageSelectors";
import { fetchArciticlesList } from "../fetchArciticlesList";

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  "profile/initArticlesPage",
  async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;

    const inited = getArticlesPageInited(getState());

    // TODO: разобраться почему inited false после инициазилации в экшене
    if (!inited) {
      dispatch(articlesPageActions.initState());
      dispatch(fetchArciticlesList({ page: 1 }));
    }
  },
);
