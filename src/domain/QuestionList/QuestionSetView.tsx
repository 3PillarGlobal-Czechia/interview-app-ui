import { LoadingOutlined } from '@ant-design/icons';
import { Col, List, Row, Spin } from 'antd';
import React from 'react';

import { arrayDistinct } from '../../helper/arrayUtils';
import { QuestionModel, QuestionSetDetail } from '../../services/Client';
import { average } from '../../helper/mathUtils';
import QuestionCard from '../Question/QuestionCard/QuestionCard';
import AverageDifficultyCircle from './AverageDifficultyCircle';
import DistinctCategoryTags from './DistinctCategoryTags';
import styles from './QuestionSetView.module.scss';
import QuestionSetViewHeader from './QuestionSetViewHeader';

export default function QuestionSetView({
  list,
  removeQuestionFromListCallback,
  updateTitleCallback,
}: {
  list: QuestionSetDetail | undefined;
  removeQuestionFromListCallback: (id: number) => void;
  updateTitleCallback: (title: string) => void;
}): JSX.Element {
  if (!list) {
    return <Spin indicator={<LoadingOutlined />} />;
  }

  return (
    <Row className={`${styles.questionSetBackground} full-height`}>
      <Col span={1} />
      <Col span={22}>
        <QuestionSetViewHeader
          title={list?.questionSet?.title ?? ''}
          createdBy="anonymous"
          updateTitleCallback={updateTitleCallback}
        />
        <div className={styles.questionSetView}>
          <AverageDifficultyCircle
            percent={Number(
              (
                average(
                  list.questions
                    ?.filter((question) => question.difficulty)
                    .map((question) => question.difficulty ?? 0) ?? []
                ) * 20
              ).toFixed(2)
            )}
          />
          <div>
            <p>
              This set contains {list.questions?.length} questions with the
              following tags:
            </p>
            <DistinctCategoryTags
              categories={arrayDistinct(
                list.questions
                  ?.filter((question) => question.category)
                  .map((question) => question.category ?? '') ?? []
              )}
            />
          </div>
        </div>
        <p>Questions in this set ({list.questions?.length}):</p>
        <List
          dataSource={list.questions}
          renderItem={(question: QuestionModel) => (
            <QuestionCard
              key={question.id}
              question={question}
              deleteClickedCallback={removeQuestionFromListCallback}
            />
          )}
        />
      </Col>
      <Col span={1} />
    </Row>
  );
}
