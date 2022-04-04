import { LoadingOutlined } from '@ant-design/icons';
import { Col, List, Row, Spin } from 'antd';
import React from 'react';

import { QuestionModel, QuestionSetDetail } from '../../services/Client';
import QuestionCard from '../Question/QuestionCard/QuestionCard';
import AverageDifficultyCircle from './AverageDifficultyCircle';
import DistinctCategoryTags from './DistinctCategoryTags';
import QuestionSetViewHeader from './QuestionSetViewHeader';

import styles from './QuestionSetView.module.scss';

export default function QuestionSetView({
  list,
}: {
  list: QuestionSetDetail | undefined;
}): JSX.Element {
  if (!list) {
    return <Spin indicator={<LoadingOutlined />} />;
  }

  return (
    <Row>
      <Col span={1} />
      <Col span={22}>
        <QuestionSetViewHeader title={list?.questionSet?.title ?? ''} createdBy='anonymous' />
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
            <QuestionCard key={question.id} question={question} tagColor={'cyan'} />
          )}
        />
      </Col>
      <Col span={1} />
    </Row>
  );
}
