import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "entities/Article";

export const fetchArciticlesList = createAsyncThunk<Article[], void, ThunkConfig<string>>(
  "profile/fetchArciticlesList",
  async (_, thunkApi) => {
    const { rejectWithValue, extra } = thunkApi;
    try {
      const response = await extra.api.get<Article[]>("/articles", {
        params: {
          _expand: "user",
        },
      });
      if (!response.data) {
        throw new Error();
      }
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue("error");
    }
  },
);
