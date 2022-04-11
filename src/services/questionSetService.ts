import { average } from '../helper/mathUtils';
import { QuestionModel } from './Client';

export function averageDifficulty(questions: QuestionModel[]): number {
  return (
    average(
      questions
        .filter((q) => q.difficulty !== undefined)
        .map((q) => q.difficulty!) // eslint-disable-line @typescript-eslint/no-non-null-assertion
    ) * 20
  );
}
