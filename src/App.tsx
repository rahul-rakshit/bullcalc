import React, { useState } from "react";
import "./App.css";
import Stonks from "./stonks/Stonks";

export function App() {
  const [executionPrice, setExecutionPrice] = useState("0");
  const [shareCount, setShareCount] = useState("0");
  const [maxLoss, setMaxLoss] = useState("0");

  const stonks = new Stonks({
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

      <p>Stop order price: {stonks.calculateStopOrderPrice()}</p>
      <p>Effective Buy-in: {stonks.calculateEffectiveBuyIn()}</p>
      <p>Percent loss: {stonks.calculatePercentLoss()}</p>
    </>
  );
}
