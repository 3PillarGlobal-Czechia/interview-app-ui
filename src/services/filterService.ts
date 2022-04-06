import { QuestionSetListItem } from './ApiClient';
import { QuestionModel } from './Client';

export function filterQuestions(
  questions: QuestionModel[],
  text: string,
  validCategories: string[] | undefined,
  minDifficulty: number | undefined,
  maxDifficulty: number | undefined,
): QuestionModel[] {
  const lowerCaseValue = text.toLowerCase();
  var ret = questions.filter(
    (question) =>
      question.title?.toLowerCase().includes(lowerCaseValue) ||
      question.content?.toLowerCase().includes(lowerCaseValue)
  );

  if (validCategories) {
    ret = ret.filter(
      (question) =>
        question.category && validCategories.map(category => category.toLowerCase()).includes(question.category.toLowerCase())
    );
  }

  if (minDifficulty) {
    ret = ret.filter(
      (question) =>
        question.difficulty && question.difficulty >= minDifficulty
    );
  }

  if (maxDifficulty) {
    ret = ret.filter(
      (question) =>
        question.difficulty && question.difficulty <= maxDifficulty
    );
  }

  return ret;
}

export function filterLists(
  lists: QuestionSetListItem[],
  value: string
): QuestionSetListItem[] {
  const lowerCaseValue = value.toLowerCase();
  const ret = lists.filter(
    (list) =>
      list.questionSet?.title?.toLowerCase().includes(lowerCaseValue) ||
      list.questionSet?.description?.toLowerCase().includes(lowerCaseValue)
  );
  return ret;
}
