import { Country } from "entities/Country";
import { Currency } from "entities/Currnecy";
import { validateProfileData } from "./validateProfileData";
import { ValidateProfileError } from "../../types/profile";

const data = {
  age: 22,
  username: "User",
  first: "Oleg",
  lastname: "Malygin",
  country: Country.Russia,
  currency: Currency.RUB,
};

describe("validateProfileData.test", () => {
  test("success", async () => {
    const result = validateProfileData(data);

    expect(result).toEqual([]);
  });

  test("without firstname & lastname", async () => {
    const result = validateProfileData({ ...data, first: "", lastname: "" });

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });

  test("incorrect age", async () => {
    const result = validateProfileData({ ...data, age: undefined });

    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
  });

  test("incorrect country", async () => {
    const result = validateProfileData({ ...data, country: undefined });

    expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
  });

  test("incorrect many data", async () => {
    const result = validateProfileData({});

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_COUNTRY,
    ]);
  });
});
