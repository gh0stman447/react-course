import { LoginSchema } from "../types/loginSchema";
import { loginActions, loginReducer } from "./loginSlice";
import { loginByUsername } from "../services/loginByUsername/loginByUsername";

describe("loginSlice", () => {
  const state: DeepPartial<LoginSchema> = {
    username: "123",
  };

  test("test setUsername", () => {
    expect(loginReducer(state as LoginSchema, loginActions.setUsername("333"))).toEqual({ username: "333" });
  });

  test("test setPassword", () => {
    const state: DeepPartial<LoginSchema> = {
      password: "123",
    };
    expect(loginReducer(state as LoginSchema, loginActions.setPassword("12345"))).toEqual({
      password: "12345",
    });
  });

  test("test setIsLoading", () => {
    const state: DeepPartial<LoginSchema> = {
      isLoading: false,
    };
    expect(loginReducer(state as LoginSchema, loginByUsername.fulfilled)).toEqual({
      isLoading: false,
    });
  });
});
