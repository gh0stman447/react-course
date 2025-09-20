import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileSchema } from "../types/profile";

const initialState: ProfileSchema = {
  readonly: true,
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
});

export const { actions: proifleActions, reducer: proifleReducer } = profileSlice;

export default profileSlice.reducer;
