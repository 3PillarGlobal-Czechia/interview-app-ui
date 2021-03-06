import { useAppInsightsContext } from '@microsoft/applicationinsights-react-js';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AvailableQuestionsView from '../../domain/QuestionList/AvailableQuestionsView';
import QuestionSetView from '../../domain/QuestionList/QuestionSetView';
import {
  Client,
  QuestionModel,
  QuestionSetDetail,
  UpdateQuestionSetRequest,
} from '../../services/Client';

export default function QuestionList(): JSX.Element {
  const { id } = useParams<'id'>();
  const client = new Client();
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

  const removeQuestionFromList = (questionId: number): void => {
    if (list?.questionSet?.id) {
      client
        .updateQuestionSet(
          list.questionSet.id,
          new UpdateQuestionSetRequest({
            ...list.questionSet,
            questionsToRemove: [questionId],
          })
        )
        .then(() => {
          setList(
            new QuestionSetDetail({
              ...list,
              questions: list?.questions?.filter(
                (question) => question.id !== questionId
              ),
            })
          );
        });
    }
  };

  const addQuestionToSet = (question: QuestionModel): void => {
    if (list?.questionSet?.id && question.id) {
      client
        .updateQuestionSet(
          list?.questionSet.id,
          new UpdateQuestionSetRequest({
            ...list.questionSet,
            questionsToAdd: [question.id],
          })
        )
        .then(() => {
          setList(
            new QuestionSetDetail({
              ...list,
              questions: [...(list?.questions ?? []), question],
            })
          );
        });
    }
  };

  const updateTitle = (title: string): void => {
    if (list?.questionSet?.id) {
      list.questionSet.title = title;
      client.updateQuestionSet(list.questionSet.id, list.questionSet);
    }
  };

  // Example how to use it
  const appInsights = useAppInsightsContext();
  appInsights.trackEvent({ name: 'QuestionList' });
  appInsights.trackPageView({ name: 'QuestionList' });

  return (
    <Row className="full-height">
      <Col span={9}>
        <QuestionSetView
          list={list}
          removeQuestionFromListCallback={removeQuestionFromList}
          updateTitleCallback={updateTitle}
        />
      </Col>
      <Col span={15}>
        <AvailableQuestionsView
          availableQuestions={allQuestions}
          questionsAddedToSet={list?.questions}
          addToSetCallback={addQuestionToSet}
        />
      </Col>
    </Row>
  );
}
