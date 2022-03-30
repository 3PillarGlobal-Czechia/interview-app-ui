import { List } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import QuestionView from '../../domain/Interview/QuestionView';
import ScalableBody from '../../layout/scalableBody/ScalableBody';
import {
  Client,
  QuestionModel,
  QuestionSetDetail,
} from '../../services/Client';

export default function Interview(): JSX.Element {
  const { id } = useParams<'id'>();
  const client = new Client();
  const [questionSetDetail, setQuestionSetDetail] =
    useState<QuestionSetDetail>();

  useEffect(() => {
    client
      .getQuestionSetById(Number(id))
      .then((questionSet) => setQuestionSetDetail(questionSet));
  }, []);

  return (
    <ScalableBody>
      <List<QuestionModel>
        itemLayout="horizontal"
        dataSource={questionSetDetail?.questions}
        renderItem={(question: QuestionModel) => (
          <List.Item>
            <QuestionView question={question} />
          </List.Item>
        )}
      />
    </ScalableBody>
  );
}
