import { QuestionModel } from './Client';
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

export function getDistinctCategories(questions: QuestionModel[]): string[] {
  const set = new Set<string>();
  questions?.forEach((question) => {
    if (question?.category) {
      set.add(question.category);
    }
  });
  return Array.from(set);
}
