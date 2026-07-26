import { describe, it, expect } from "vitest";
import { getMotivation } from "./helpers";

describe("getMotivation", () => {
  it("returns a non-empty message for any non-negative week", () => {
    for (let week = 0; week < 20; week++) {
      expect(getMotivation(week)).toBeTruthy();
    }
  });

  it("cycles back to the same message after a full loop of the message list", () => {
    const messageCount = 7;
    expect(getMotivation(0)).toBe(getMotivation(messageCount));
    expect(getMotivation(2)).toBe(getMotivation(messageCount + 2));
  });
});
