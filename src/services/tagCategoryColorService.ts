import { hashCode } from '../helper/stringUtils';

const colors: string[] = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'yellow',
  'black',
];

export function colorByCategory(category: string): string {
  return colors[Math.abs(hashCode(category)) % colors.length];
}
