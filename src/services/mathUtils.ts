export function average(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

const percentageGreen = '#A0D911';
const percentageYellow = '#FADB14';
const percentageOrange = '#FA8C16';
const percentageRed = '#D4380D';

export function difficultyPercentageToColor(percentage: number): string {
  if (percentage < 25) return percentageGreen;
  if (percentage < 50) return percentageYellow;
  if (percentage < 75) return percentageOrange;
  return percentageRed;
}
