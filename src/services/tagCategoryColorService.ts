import { QuestionModel } from './Client';

const colors: string[] = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'yellow',
  'black',
];
let colorIndex = 0;
const hashmap = new Map<string, string>();

const nextColor = (): string => {
  const color = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;
  return color;
};

export function colorByCategory(category: string): string {
  if (!hashmap.has(category)) {
    hashmap.set(category, nextColor());
  }
  return hashmap.get(category) ?? 'black';
}

export function getDistinctCategories(questions: QuestionModel[]): string[] {
  const set = new Set<string>();
  questions?.forEach((question) => {
    if (question?.category) {
      set.add(question.category);
    }
  });
  return Array.from(set);
}
