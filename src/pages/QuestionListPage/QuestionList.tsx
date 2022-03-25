import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import QuestionCart from '../../domain/QuestionList/QuestionCart';
import styles from '../../domain/QuestionList/QuestionList.module.scss';
import QuestionListData from '../../domain/QuestionList/QuestionListData';
import QuestionListHeader from '../../domain/QuestionList/QuestionListHeader';
import ScalableBody from '../../layout/scalableBody/ScalableBody';
import {
  Client,
  QuestionModel,
  QuestionSetDetail,
  UpdateQuestionSetRequest,
} from '../../services/Client';

export default function QuestionList(): JSX.Element {
  const { id } = useParams<'id'>();
  const client = new Client();
  const [isBeingEdited, setBeingEdited] = useState<boolean>(false);
  const [list, setList] = useState<QuestionSetDetail>();
  const [allQuestions, setAllQuestions] = useState<QuestionModel[]>([]);
  useEffect(() => {
    client.getQuestionSetById(Number(id)).then((questionSet) => {
      setList(questionSet);
    });
    client.getQuestions(undefined, undefined, undefined).then((questions) => {
      setAllQuestions(questions);
    });
  }, []);

  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [questionsToAdd, setQuestionsToAdd] = useState<QuestionModel[]>([]);
  const [questionsToRemove, setQuestionsToRemove] = useState<QuestionModel[]>(
    []
  );
  const setDrawerVisibility = (value: boolean | null = null): void => {
    setDrawerVisible((isCurrentlyVisible) => value ?? !isCurrentlyVisible);
  };

  const addToAddDrawer = (record: QuestionModel): void => {
    setQuestionsToAdd((old) => [...old, record]);
  };

  const addToRemoveDrawer = (record: QuestionModel): void => {
    setQuestionsToRemove((old) => [...old, record]);
  };

  const removeFromAddDrawer = (question: QuestionModel): void => {
    setQuestionsToAdd((old) => old.filter((q) => q.id !== question.id));
  };

  const removeFromRemoveDrawer = (question: QuestionModel): void => {
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
      .updateQuestionSet(
        list?.questionSet?.id ?? 0,
        new UpdateQuestionSetRequest({
          title: list?.questionSet?.title,
          description: list?.questionSet?.description,
          questionsToAdd: questionsToAdd.map((q) => (q.id ? q.id : 0)),
          questionsToRemove: questionsToRemove.map((q) => (q.id ? q.id : 0)),
        })
      )
      .then(() => {
        setList(
          (old) =>
            new QuestionSetDetail({
              ...old,
              questions: [
                ...(old?.questions?.filter(
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
      !list?.questions?.map((q) => q.id).includes(question.id) &&
      !questionsToAdd.map((q) => q.id).includes(question.id)
  );

  const displayableQuestions =
    list?.questions?.filter(
      (question) => !questionsToRemove.map((q) => q.id).includes(question.id)
    ) ?? [];

  return (
    <ScalableBody>
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
          listTitle={list?.questionSet?.title}
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
    </ScalableBody>
  );
}
