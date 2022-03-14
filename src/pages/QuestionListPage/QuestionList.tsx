import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import QuestionCart from '../../domain/QuestionList/QuestionCart';
import styles from '../../domain/QuestionList/QuestionList.module.scss';
import QuestionListData from '../../domain/QuestionList/QuestionListData';
import QuestionListHeader from '../../domain/QuestionList/QuestionListHeader';
import {
  Client,
  InterviewQuestionModel,
  QuestionListModel,
  UpdateQuestionListRequest,
} from '../../services/Client';

export default function QuestionList(): JSX.Element {
  const { id } = useParams<'id'>();
  const client = new Client();
  const [isBeingEdited, setBeingEdited] = useState<boolean>(false);
  const [list, setList] = useState<QuestionListModel>();
  const [allQuestions, setAllQuestions] = useState<InterviewQuestionModel[]>(
    []
  );
  useEffect(() => {
    client.questionLists(Number(id), undefined, undefined).then((lists) => {
      setList(lists[0]);
    });
    client
      .interviewQuestions(undefined, undefined, undefined)
      .then((questions) => {
        setAllQuestions(questions);
      });
  }, []);

  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [questionsToAdd, setQuestionsToAdd] = useState<
    InterviewQuestionModel[]
  >([]);
  const [questionsToRemove, setQuestionsToRemove] = useState<
    InterviewQuestionModel[]
  >([]);
  const setDrawerVisibility = (value: boolean | null = null): void => {
    setDrawerVisible((isCurrentlyVisible) => value ?? !isCurrentlyVisible);
  };

  const addToAddDrawer = (record: InterviewQuestionModel): void => {
    setQuestionsToAdd((old) => [...old, record]);
  };

  const addToRemoveDrawer = (record: InterviewQuestionModel): void => {
    setQuestionsToRemove((old) => [...old, record]);
  };

  const removeFromAddDrawer = (question: InterviewQuestionModel): void => {
    setQuestionsToAdd((old) => old.filter((q) => q.id !== question.id));
  };

  const removeFromRemoveDrawer = (question: InterviewQuestionModel): void => {
    setQuestionsToRemove((old) => old.filter((q) => q.id !== question.id));
  };

  const clearDrawerQuestions = (): void => {
    questionsToAdd.forEach((question) => removeFromAddDrawer(question));
    questionsToRemove.forEach((question) => removeFromRemoveDrawer(question));
  };

  const discard = (): void => {
    clearDrawerQuestions();
    setBeingEdited(false);
  };

  const saveChanges = (): void => {
    client
      .update2(
        new UpdateQuestionListRequest({
          id: list?.id,
          title: list?.title,
          description: list?.description,
          questionsToAdd: questionsToAdd.map((q) => q.id!),
          questionsToRemove: questionsToRemove.map((q) => q.id!),
        })
      )
      .then(() => {
        setList(
          (old) =>
            new QuestionListModel({
              ...old,
              interviewQuestions: [
                ...(old?.interviewQuestions?.filter(
                  (q) => !questionsToRemove.map((rq) => rq.id).includes(q.id)
                ) ?? []),
                ...questionsToAdd,
              ],
            })
        );
        clearDrawerQuestions();
        setBeingEdited(false);
      });
  };

  const addableQuestions = allQuestions.filter(
    (question) =>
      !list?.interviewQuestions?.map((q) => q.id).includes(question.id) &&
      !questionsToAdd.map((q) => q.id).includes(question.id)
  );

  const displayableQuestions =
    list?.interviewQuestions?.filter(
      (question) => !questionsToRemove.map((q) => q.id).includes(question.id)
    ) ?? [];

  return (
    <div className={styles.questionList}>
      <QuestionCart
        isVisible={isDrawerVisible}
        visibilityChangedCallback={setDrawerVisibility}
        addList={questionsToAdd}
        removeList={questionsToRemove}
        removeFromAddListCallback={removeFromAddDrawer}
        removeFromRemoveListCallback={removeFromRemoveDrawer}
      />
      <QuestionListHeader
        isBeingEdited={isBeingEdited}
        setBeingEditedCallback={setBeingEdited}
        listTitle={list?.title}
        discardCallback={discard}
        saveChangesCallback={saveChanges}
        setDrawerVisibilityCallback={setDrawerVisibility}
      />
      <QuestionListData
        isBeingEdited={isBeingEdited}
        list={list}
        allQuestions={allQuestions}
        addToAddDrawerCallback={addToAddDrawer}
        addToRemoveDrawerCallback={addToRemoveDrawer}
        displayableQuestions={displayableQuestions}
        addableQuestions={addableQuestions}
      />
    </div>
  );
}
