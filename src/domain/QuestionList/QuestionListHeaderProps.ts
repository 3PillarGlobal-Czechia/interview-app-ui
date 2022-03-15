export default interface QuestionListDataProps {
  isBeingEdited: boolean;
  setBeingEditedCallback: (value: boolean) => void;
  listTitle: string | undefined;
  discardCallback: () => void;
  saveChangesCallback: () => void;
  setDrawerVisibilityCallback: (value?: boolean | null) => void;
}
