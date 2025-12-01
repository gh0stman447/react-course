import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Comment } from "entities/Comment";
import { getUserAuthData } from "entities/User";
import { getArticleDetailsData } from "entities/Article";
import { fetchCommentsByArticleId } from "../fetchCommentsByArticleId/fetchCommentsByArticleId";

export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
  "articleDetails/addCommentForArticle",
  async (text, thunkApi) => {
    const {
      rejectWithValue, extra, getState, dispatch,
    } = thunkApi;

    const userId = getUserAuthData(getState())?.id;
    const articleId = getArticleDetailsData(getState())?.id;

    if (!userId || !text || !articleId) {
      return rejectWithValue("no data");
    }

    try {
      const response = await extra.api.post<Comment>("/comments", {
        articleId,
        userId,
        text,
      });

      if (!response.data) {
        throw new Error();
      }

      dispatch(fetchCommentsByArticleId(articleId));

      return response.data;
    } catch (e) {
      return rejectWithValue("error");
    }
  },
);
