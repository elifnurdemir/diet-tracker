import { describe, it, expect } from "vitest";
import { getStepForScale, generateMarks } from "./water";

describe("getStepForScale", () => {
  it.each([
    [500, 100],
    [1000, 200],
    [2000, 250],
    [3000, 500],
    [5000, 500],
  ])("returns step %i for max %i", (max, expectedStep) => {
    expect(getStepForScale(max)).toBe(expectedStep);
  });
});

describe("generateMarks", () => {
  it("starts at 0 and ends exactly at the daily goal", () => {
    const marks = generateMarks(2000);

    expect(marks[0].value).toBe(0);
    expect(marks[marks.length - 1].value).toBe(2000);
    expect(marks[marks.length - 1].label).toBe("2000ml");
  });

  it("does not duplicate the last mark when the goal is already a step multiple", () => {
    const marks = generateMarks(500); // step is 100, so 500 lands exactly on a step
    const values = marks.map((m) => m.value);
    const uniqueValues = new Set(values);

    expect(values).toHaveLength(uniqueValues.size);
  });

  it("adds a final mark when the goal does not land on a step boundary", () => {
    const marks = generateMarks(1234); // step 200 -> last natural mark is 1200
    const last = marks[marks.length - 1];

    expect(last.value).toBe(1234);
    expect(last.position).toBe("0%");
  });
});
