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

  // Example how to use it
  const appInsights = useAppInsightsContext();
  appInsights.trackEvent({ name: 'QuestionList' });
  appInsights.trackPageView({ name: 'QuestionList' });

  return (
    <Row>
      <Col span={9}>
        <QuestionSetView />
      </Col>
      <Col span={15}>
        <AvailableQuestionsView />
      </Col>
    </Row>
  );
}
