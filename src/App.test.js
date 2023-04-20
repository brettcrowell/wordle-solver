import { getOptions } from "./App";

describe("#getOptions", () => {
  it("should return a singular option if the value is known", () => {
    expect(getOptions(["a"], [], 1)).toEqual(["a"]);
  });
  it("should return all options that are not omitted if the value is unknown", () => {
    expect(getOptions([], ["a"], 1)).toEqual([..."bcdefghijklmnopqrstuvwxyz"]);
  });
  it("should return all possible options if the value is unknown and there are no omissions", () => {
    expect(getOptions([], [], 1)).toEqual([..."abcdefghijklmnopqrstuvwxyz"]);
  });
  it("should return all valid combinations when length > 0", () => {
    expect(
      getOptions(["a"], ["", [..."acdefghijklmnopqrstuvwxyz"]], 2)
    ).toEqual(["ab"]);
  });
});
