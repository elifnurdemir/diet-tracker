export const getStepForScale = (max: number) => {
  if (max <= 500) return 100;
  if (max <= 1000) return 200;
  if (max <= 2000) return 250;
  if (max <= 3000) return 500;
  return 500;
};

export const generateMarks = (dailyIdealWater: number) => {
  const marks: { value: number; position: string; label: string }[] = [];
  const step = getStepForScale(dailyIdealWater);

  for (let value = 0; value <= dailyIdealWater; value += step) {
    const position = (value / dailyIdealWater) * 100;
    marks.push({
      value,
      position: `${100 - position}%`,
      label: `${value}ml`,
    });
  }

  const lastMark = marks[marks.length - 1];
  if (lastMark.value < dailyIdealWater) {
    marks.push({
      value: dailyIdealWater,
      position: `0%`,
      label: `${Math.round(dailyIdealWater)}ml`,
    });
  }

  return marks;
};
