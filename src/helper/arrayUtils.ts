export function arrayDistinct<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
