import zeroFallback from "./zeroFallBack";

describe("zeroFallback", () => {
  it("returns the string if it's not empty", () => {
    const input = "2.51";
    const output = zeroFallback(input);
    expect(output).toEqual(input);
  });

  it ("returns 0 if the string is empty", () => {
    const input = "";
    const output = zeroFallback(input);
    expect(output).toEqual("0");
  })
});
