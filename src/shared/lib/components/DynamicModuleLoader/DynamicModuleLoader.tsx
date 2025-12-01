import React, { FC, useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import { ReduxStoreWithManager } from "app/providers/StoreProvider";
import { StateSchemaKeys } from "app/providers/StoreProvider/config/StateSchema";
import { Reducer } from "@reduxjs/toolkit";

export type ReducerList = {
  [name in StateSchemaKeys]?: Reducer;
};

interface DynamicModuleLoaderProps {
  children: React.ReactNode;
  reducers: ReducerList;
  removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props: DynamicModuleLoaderProps) => {
  const { children, reducers, removeAfterUnmount = true } = props;
  const dispatch = useDispatch();

  const store = useStore() as ReduxStoreWithManager;

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      store.reducerManager.add(name as StateSchemaKeys, reducer);
      dispatch({ type: `"@@INIT ${name} reducer` });
    });

    return () => {
      if (!removeAfterUnmount) return;

      Object.entries(reducers).forEach(([name, _]) => {
        store.reducerManager.remove(name as StateSchemaKeys);
        dispatch({ type: `@@Destroy ${name} reducer` });
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
