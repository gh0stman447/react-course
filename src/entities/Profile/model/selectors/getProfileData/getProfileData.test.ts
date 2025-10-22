import { StateSchema } from "app/providers/StoreProvider";
import { Country } from "entities/Country";
import { Currency } from "entities/Currnecy";
import { getProfileData } from "./getProfileData";

describe("getProfileData.test", () => {
  test("should return error", () => {
    const data = {
      age: 22,
      username: "User",
      first: "Oleg",
      lastname: "Malygin",
      country: Country.Russia,
      currency: Currency.RUB,
    };

    const state: DeepPartial<StateSchema> = {
      profile: {
        data,
      },
    };

    expect(getProfileData(state as StateSchema)).toEqual(data);
  });

  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
