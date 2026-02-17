import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScrollSaveSchema } from "../types/ScrollSaveSchema";

const initialState: ScrollSaveSchema = {
  scroll: {},
};

export const loginSlice = createSlice({
  name: "ScrollSave",
  initialState,
  reducers: {
    setScrollPosition(state, { payload }: PayloadAction<{ path: string; position: number }>) {
      state.scroll[payload.path] = payload.position;
    },
  },
});

export const { actions: scrollSaveActions, reducer: scrollSaveReducer } = loginSlice;

export default loginSlice.reducer;
