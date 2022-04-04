import { useAppInsightsContext } from '@microsoft/applicationinsights-react-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from '../../domain/QuestionList/QuestionList.module.scss';
import ScalableBody from '../../layout/scalableBody/ScalableBody';
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
    <div className={styles.questionList}>

    </div>
  );
}
