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

export function hashCode(srt: string): number {
  let h = 0;
  const l = srt.length;
  let i = 0;
  if (l > 0) while (i < l) h = ((h << 5) - h + srt.charCodeAt(i++)) | 0; // eslint-disable-line no-bitwise, no-plusplus
  return h;
}
