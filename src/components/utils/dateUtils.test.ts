import { describe, it, expect } from "vitest";
import { getCurrentWeekDates, getMonthDays, toDateKey } from "./dateUtils";

describe("toDateKey", () => {
  it("formats a local date as YYYY-MM-DD using local components (not UTC)", () => {
    // Regression test: this used to go through toISOString(), which shifts
    // the date backwards by a day for any timezone ahead of UTC (e.g. UTC+3).
    const date = new Date(2026, 1, 1); // local Feb 1, 2026, midnight
    expect(toDateKey(date)).toBe("2026-02-01");
  });

  it("pads single-digit months and days with a leading zero", () => {
    expect(toDateKey(new Date(2026, 0, 5))).toBe("2026-01-05");
  });
});

describe("getMonthDays", () => {
  it("returns the correct number of day cells including leading nulls", () => {
    // July 2026 starts on a Wednesday (index 2 when week starts Monday) and has 31 days
    const days = getMonthDays(new Date(2026, 6, 1));
    const leadingNulls = days.filter((d) => d === null).length;
    const dateEntries = days.filter((d) => d !== null);

    expect(leadingNulls).toBe(2);
    expect(dateEntries).toHaveLength(31);
  });

  it("returns ISO date strings (YYYY-MM-DD) for each day of the month", () => {
    const days = getMonthDays(new Date(2026, 1, 1)); // February 2026 (28 days)
    const dateEntries = days.filter((d): d is string => d !== null);

    expect(dateEntries).toHaveLength(28);
    expect(dateEntries[0]).toBe("2026-02-01");
    expect(dateEntries[dateEntries.length - 1]).toBe("2026-02-28");
  });

  it("handles a month that starts on Monday with zero leading nulls", () => {
    // June 2026 starts on a Monday
    const days = getMonthDays(new Date(2026, 5, 1));
    expect(days[0]).not.toBeNull();
  });
});

describe("getCurrentWeekDates", () => {
  it("returns 7 consecutive dates starting on Sunday and containing the reference date", () => {
    // July 25, 2026 is a Saturday
    const reference = new Date(2026, 6, 25);
    const week = getCurrentWeekDates(reference);

    expect(week).toEqual([
      "2026-07-19",
      "2026-07-20",
      "2026-07-21",
      "2026-07-22",
      "2026-07-23",
      "2026-07-24",
      "2026-07-25",
    ]);
  });

  it("starts on the same day when the reference date is already a Sunday", () => {
    const reference = new Date(2026, 6, 19); // Sunday
    const week = getCurrentWeekDates(reference);
    expect(week[0]).toBe("2026-07-19");
  });
});
