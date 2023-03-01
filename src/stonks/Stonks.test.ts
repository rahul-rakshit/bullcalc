import Stonks from "./Stonks";

describe("calculateStopOrderPrice", () => {
  const calculationParameters: CalculationParameters = {
    currentPrice: "38.48",
    executionPrice: "39.48",
    shareCount: "2",
    buyFee: "1",
    sellFee: "1",
    maxLoss: "4.00",
  };

  it("calculates the effective buy-in price", () => {
    const stonks = new Stonks(calculationParameters);
    const effectiveBuyIn = stonks.calculateEffectiveBuyIn();
    expect(effectiveBuyIn).toEqual("40.48");
  });

  it("calculates the stop order price for at a maximum loss", () => {
    const stonks = new Stonks(calculationParameters);
    const stopOrderPrice = stonks.calculateStopOrderPrice();
    expect(stopOrderPrice).toEqual("38.48");
  });

  it("calculates the percent loss at the given stock order price", () => {
    const stonks = new Stonks(calculationParameters);
    const maxPercentLoss = stonks.calculateMaxPercentLoss();
    expect(maxPercentLoss).toEqual("4.94%");
  });

  it("calculates the initial percent loss", () => {
    const stonks = new Stonks(calculationParameters);
    const initialPercentLoss = stonks.calculateInitialPercentLoss();
    expect(initialPercentLoss).toEqual("5.20%");
  });

  it("can be initialized from empty string arguments", () => {
    const initializationWithEmptyStringArgs = () => {
      new Stonks({ ...calculationParameters, executionPrice: "" });
    };
    expect(initializationWithEmptyStringArgs).not.toThrow();
  });
});
