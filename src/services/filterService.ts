import { InterviewQuestionModel, QuestionListModel } from './Client';

export function filterQuestions(
  questions: InterviewQuestionModel[],
  value: string
): InterviewQuestionModel[] {
  const lowerCaseValue = value.toLowerCase();
  return questions.filter(
    (question) =>
      question.title?.toLowerCase().includes(lowerCaseValue) ||
      question.content?.toLowerCase().includes(lowerCaseValue) ||
      question.category?.toLowerCase().includes(lowerCaseValue)
  );
}

export function filterLists(
  lists: QuestionListModel[],
  value: string,
  filterAlsoQuestions = true
): QuestionListModel[] {
  const lowerCaseValue = value.toLowerCase();
  let ret = lists.filter(
    (list) =>
      list.title?.toLowerCase().includes(lowerCaseValue) ||
      list.description?.toLowerCase().includes(lowerCaseValue)
  );

  if (filterAlsoQuestions) {
    ret = Array.from(
      new Set<QuestionListModel>([
        ...ret,
        ...lists.filter((list) =>
          list.interviewQuestions?.some(Boolean)
            ? filterQuestions(list.interviewQuestions, lowerCaseValue).some(
                Boolean
              )
            : true
        ),
      ])
    );
  }

  return ret;
}
