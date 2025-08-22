import { counterActions, counterReducer } from "./CounterSlice";
import { CounterSchema } from "../types/CounterSchema";

describe("CounterSlice", () => {
  const state: CounterSchema = { value: 10 };
  test("should decrement value", () => {
    expect(counterReducer(state as CounterSchema, counterActions.decrement())).toEqual({ value: 9 });
  });

  test("should increment value", () => {
    expect(counterReducer({ value: 10 } as CounterSchema, counterActions.increment())).toEqual({ value: 11 });
  });

  test("should work with empty state", () => {
    expect(counterReducer(undefined, counterActions.increment())).toEqual({ value: 1 });
  });
});
