import { QuestionModel, QuestionSetModel } from './Client';

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
  lists: QuestionSetModel[],
  value: string
): QuestionSetModel[] {
  const lowerCaseValue = value.toLowerCase();
  const ret = lists.filter(
    (list) =>
      list.title?.toLowerCase().includes(lowerCaseValue) ||
      list.description?.toLowerCase().includes(lowerCaseValue)
  );

  return ret;
}
