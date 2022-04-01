import { QuestionSetListItem } from './ApiClient';
import { QuestionModel } from './Client';

export function filterQuestions(
  questions: QuestionModel[],
  value: string
): QuestionModel[] {
  const lowerCaseValue = value.toLowerCase();
  return questions.filter(
    (question) =>
      question.title?.toLowerCase().includes(lowerCaseValue) ||
      question.content?.toLowerCase().includes(lowerCaseValue) ||
      question.category?.toLowerCase().includes(lowerCaseValue)
  );
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
