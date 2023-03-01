import React, { useState } from "react";
import "./App.css";
import Stonks from "./stonks/Stonks";

export function App() {
  const [currentPrice, setCurrentPrice] = useState("0");
  const [executionPrice, setExecutionPrice] = useState("0");
  const [shareCount, setShareCount] = useState("0");
  const [maxLoss, setMaxLoss] = useState("0");

  const stonks = new Stonks({
    currentPrice,
    executionPrice,
    shareCount,
    maxLoss,
  });

  return (
    <>
      <h2>Moo 🐄</h2>
      <form>
        <fieldset>
          <label>
            Current Price
            <input
              type="number"
              onChange={(event) => setCurrentPrice(event.target.value)}
              value={currentPrice}
            />
          </label>
        </fieldset>

        <fieldset>
          <label>
            Execution Price
            <input
              type="number"
              onChange={(event) => setExecutionPrice(event.target.value)}
              value={executionPrice}
            />
          </label>
        </fieldset>

        <fieldset>
          <label>
            Share Count
            <input
              type="number"
              onChange={(event) => {
                setShareCount(event.target.value);
              }}
              value={shareCount}
            />
          </label>
        </fieldset>

        <fieldset>
          <label>
            Max Loss
            <input
              type="number"
              onChange={(event) => setMaxLoss(event.target.value)}
              value={maxLoss}
            />
          </label>
        </fieldset>
      </form>

      <p>Stop order price at max loss: {stonks.calculateStopOrderPrice()}</p>
      <p>Effective Buy-in: {stonks.calculateEffectiveBuyIn()}</p>
      <p>Initial percent loss: {stonks.calculateInitialPercentLoss()}</p>
      <p>Percent loss at max loss: {stonks.calculateMaxPercentLoss()}</p>
    </>
  );
}
