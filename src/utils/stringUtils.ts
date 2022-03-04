export function toPascalCase(str: string): string {
  const arr = str.split(' ');
  arr.forEach((value, index) => {
    arr[index] = value.charAt(0).toUpperCase() + value.slice(1);
  });
  return arr.join(' ');
}

export function getDistinctValues(arr: string[]): string[] {
  if (arr === undefined) return [];
  const distinctValues = new Set<string>();
  arr.forEach((value) => {
    distinctValues.add(value);
  });
  return Array.from(distinctValues);
}
