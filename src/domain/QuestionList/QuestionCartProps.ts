import { InterviewQuestionModel } from '../../services/Client';

export default interface QuestionCartProps {
  isVisible: boolean;
  visibilityChangedCallback: (value?: boolean | null) => void;
  addList: InterviewQuestionModel[];
  removeList: InterviewQuestionModel[];
  removeFromAddListCallback: (question: InterviewQuestionModel) => void;
  removeFromRemoveListCallback: (question: InterviewQuestionModel) => void;
}
