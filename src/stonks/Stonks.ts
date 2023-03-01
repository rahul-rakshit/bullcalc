import Decimal from "decimal.js";
import zeroFallback from "../utils/zeroFallBack";

const defaultBuyFee = "1";
const defaultSellFee = "1";

class Stonks {
  currentPrice: Decimal;
  executionPrice: Decimal;
  shareCount: Decimal;
  buyFee: Decimal;
  sellFee: Decimal;
  maxLoss: Decimal;

  constructor(props: CalculationParameters) {
    this.currentPrice = new Decimal(zeroFallback(props.currentPrice));
    this.executionPrice = new Decimal(zeroFallback(props.executionPrice));
    this.shareCount = new Decimal(zeroFallback(props.shareCount));
    this.buyFee = new Decimal(props.buyFee ?? defaultBuyFee);
    this.sellFee = new Decimal(props.sellFee ?? defaultSellFee);
    this.maxLoss = new Decimal(zeroFallback(props.maxLoss));
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

  calculateMaxPercentLoss() {
    const effectiveBuyIn = new Decimal(this.calculateEffectiveBuyIn());
    const moneyInvested = effectiveBuyIn.times(this.shareCount);
    return this.maxLoss.dividedBy(moneyInvested).times(100).toFixed(2) + "%";
  }

  calculateInitialPercentLoss() {
    const effectiveBuyIn = new Decimal(this.calculateEffectiveBuyIn());
    const moneyInvested = effectiveBuyIn.times(this.shareCount);
    const worth = this.currentPrice.times(this.shareCount);
    return (
      moneyInvested.minus(worth).dividedBy(worth).times(100).toFixed(2) + "%"
    );
  }
}

export default Stonks;
