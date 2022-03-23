export interface CreateQuestionListModalProps {
  visible: boolean;
  okCallback: (title: string, description: string) => void;
  cancelCallback: () => void;
}
