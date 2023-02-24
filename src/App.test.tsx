import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";

test("Setup", () => {
  render(<App />);
  expect(screen.getByText("Hi!")).toBeInTheDocument();
});
