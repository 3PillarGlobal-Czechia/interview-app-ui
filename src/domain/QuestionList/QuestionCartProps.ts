import { QuestionModel } from '../../services/Client';

export default interface QuestionCartProps {
  isVisible: boolean;
  visibilityChangedCallback: (value?: boolean | null) => void;
  addList: QuestionModel[];
  removeList: QuestionModel[];
  removeFromAddListCallback: (question: QuestionModel) => void;
  removeFromRemoveListCallback: (question: QuestionModel) => void;
}
