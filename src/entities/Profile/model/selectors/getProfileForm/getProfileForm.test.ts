import { StateSchema } from "app/providers/StoreProvider";
import { Country } from "entities/Country";
import { Currency } from "entities/Currnecy";
import { getProfileForm } from "./getProfileForm";

describe("getProfileForm.test", () => {
  test("should work with filled state", () => {
    const form = {
      age: 22,
      username: "User",
      first: "Oleg",
      lastname: "Malygin",
      country: Country.Russia,
      currency: Currency.RUB,
    };

    const state: DeepPartial<StateSchema> = {
      profile: {
        form,
      },
    };

    expect(getProfileForm(state as StateSchema)).toEqual(form);
  });

  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});
