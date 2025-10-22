import { Country } from "entities/Country";
import { Currency } from "entities/Currnecy";
import { Profile, ProfileSchema, ValidateProfileError } from "../types/profile";
import { profileReducer, proifleActions } from "./profileSlice";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";

const data = {
  age: 22,
  username: "User",
  first: "Oleg",
  lastname: "Malygin",
  country: Country.Russia,
  currency: Currency.RUB,
};

describe("profileSlice", () => {
  const state: DeepPartial<ProfileSchema> = {
    readonly: false,
  };

  test("test set readonly", () => {
    expect(profileReducer(state as ProfileSchema, proifleActions.setReadonly(true))).toEqual({ readonly: true });
  });

  test("test cancel edit", () => {
    const state: DeepPartial<ProfileSchema> = { data, form: { username: "" } };
    expect(profileReducer(state as ProfileSchema, proifleActions.cancelEdit())).toEqual({
      readonly: true,
      validateErrors: undefined,
      data,
      form: data,
    });
  });

  test("test updateProfile", () => {
    const state: DeepPartial<ProfileSchema> = { form: { username: "", age: 16 } };

    expect(
      profileReducer(
        state as ProfileSchema,
        proifleActions.updateProfile({
          username: "12345",
          age: 20,
        }),
      ),
    ).toEqual({
      form: { username: "12345", age: 20 },
    });
  });

  test("test update profile service pending", () => {
    const state: DeepPartial<ProfileSchema> = { isLoading: false, validateErrors: [ValidateProfileError.SERVER_ERROR] };

    expect(profileReducer(state as ProfileSchema, updateProfileData.pending)).toEqual({
      isLoading: true,
      validateErrors: undefined,
    });
  });

  test("test update profile service fulfilled", () => {
    const state: DeepPartial<ProfileSchema> = { isLoading: true };

    expect(profileReducer(state as ProfileSchema, updateProfileData.fulfilled(data, ""))).toEqual({
      isLoading: false,
      readonly: true,
      form: data,
      data,
    });
  });
});
