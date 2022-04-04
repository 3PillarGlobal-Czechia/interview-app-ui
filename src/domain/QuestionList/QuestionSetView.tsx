import { LoadingOutlined } from '@ant-design/icons';
import { Col, List, Row, Spin } from 'antd';
import React from 'react';

import { Client, QuestionModel, QuestionSetDetail, UpdateQuestionSetRequest } from '../../services/Client';
import QuestionCard from '../Question/QuestionCard/QuestionCard';
import AverageDifficultyCircle from './AverageDifficultyCircle';
import DistinctCategoryTags from './DistinctCategoryTags';
import QuestionSetViewHeader from './QuestionSetViewHeader';

import styles from './QuestionSetView.module.scss';

export default function QuestionSetView({
  list,
  removeQuestionFromListCallback
}: {
  list: QuestionSetDetail | undefined;
  removeQuestionFromListCallback: (id: number) => void;
}): JSX.Element {
  if (!list) {
    return <Spin indicator={<LoadingOutlined />} />;
  }

  const client = new Client();
  const updateTitleCallback = (title: string) => {
    if (list.questionSet?.id) {
      list.questionSet.title = title;
      client.updateQuestionSet(list.questionSet.id, list.questionSet);
    }
  }

  return (
    <Row className={`${styles.questionSetBackground} full-height`}>
      <Col span={1} />
      <Col span={22}>
        <QuestionSetViewHeader title={list?.questionSet?.title ?? ''} createdBy='anonymous' updateTitleCallback={updateTitleCallback} />
        <div className={styles.questionSetView}>
          <AverageDifficultyCircle />
          <p>
            This set contains {list.questions?.length} questions with the
            following tags:
          </p>
          <DistinctCategoryTags />
        </div>
        <p>Questions in this set ({list.questions?.length}):</p>
        <List
          dataSource={list.questions}
          renderItem={(question: QuestionModel) => (
            <QuestionCard key={question.id} question={question} tagColor={'cyan'} deleteClickedCallback={removeQuestionFromListCallback} />
          )}
        />
      </Col>
      <Col span={1} />
    </Row>
  );
}
