import Decimal from "decimal.js";

const defaultBuyFee = "1";
const defaultSellFee = "1";

class Stonks {
  currentSharePrice: Decimal;
  executionPrice: Decimal;
  shareCount: Decimal;
  buyFee: Decimal;
  sellFee: Decimal;
  maxLoss: Decimal;

  constructor(props: CalculationParameters) {
    this.currentSharePrice = new Decimal(props.currentSharePrice);
    this.executionPrice = new Decimal(props.executionPrice);
    this.shareCount = new Decimal(props.shareCount);
    this.buyFee = new Decimal(props.buyFee ?? defaultBuyFee);
    this.sellFee = new Decimal(props.sellFee ?? defaultSellFee);
    this.maxLoss = new Decimal(props.maxLoss);
  }

  calculateEffectiveBuyIn() {
    return this.executionPrice
      .times(this.shareCount)
      .plus(this.buyFee)
      .plus(this.sellFee)
      .dividedBy(this.shareCount)
      .toFixed(2);
  }

  calculateStopOrderPrice() {
    const effectiveBuyIn = new Decimal(this.calculateEffectiveBuyIn());
    const priceDelta = this.maxLoss.dividedBy(this.shareCount);
    return effectiveBuyIn.minus(priceDelta).toFixed(2);
  }

  calculatePercentLoss() {
    const effectiveBuyIn = new Decimal(this.calculateEffectiveBuyIn());
    const moneyInvested = effectiveBuyIn.times(this.shareCount);
    return this.maxLoss.dividedBy(moneyInvested).times(100).toFixed(2) + "%";
  }
}

export default Stonks;
