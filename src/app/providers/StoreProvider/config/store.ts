import { combineReducers, configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { counterReducer } from "entities/Counter";
import { StateSchema } from "./StateSchema";
import { userReducer } from "entities/User/model/slice/userSlice";

export function createReduxStore(initialState?: StateSchema) {
  const rootReduser: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,
  };

  return configureStore<StateSchema>({
    reducer: rootReduser,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });
}
