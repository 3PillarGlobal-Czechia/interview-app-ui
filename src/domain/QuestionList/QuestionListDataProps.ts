import { QuestionModel, QuestionSetDetail } from '../../services/Client';

export default interface QuestionListDataProps {
  isBeingEdited: boolean;
  list: QuestionSetDetail | undefined;
  displayableQuestions: QuestionModel[];
  addableQuestions: QuestionModel[];
  allQuestions: QuestionModel[];
  addToRemoveDrawerCallback: (question: QuestionModel) => void;
  addToAddDrawerCallback: (question: QuestionModel) => void;
}
