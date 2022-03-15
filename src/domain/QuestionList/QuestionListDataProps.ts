import {
  InterviewQuestionModel,
  QuestionListModel,
} from '../../services/Client';

export default interface QuestionListDataProps {
  isBeingEdited: boolean;
  list: QuestionListModel | undefined;
  displayableQuestions: InterviewQuestionModel[];
  addableQuestions: InterviewQuestionModel[];
  allQuestions: InterviewQuestionModel[];
  addToRemoveDrawerCallback: (question: InterviewQuestionModel) => void;
  addToAddDrawerCallback: (question: InterviewQuestionModel) => void;
}
