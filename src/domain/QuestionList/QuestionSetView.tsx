import { LoadingOutlined } from '@ant-design/icons';
import { List, Spin } from 'antd';
import React from 'react';

import { QuestionModel, QuestionSetDetail } from '../../services/Client';
import QuestionCard from '../Question/QuestionCard/QuestionCard';
import AverageDifficultyCircle from './AverageDifficultyCircle';
import DistinctCategoryTags from './DistinctCategoryTags';
import QuestionSetViewHeader from './QuestionSetViewHeader';

export default function QuestionSetView({
  list,
}: {
  list: QuestionSetDetail | undefined;
}): JSX.Element {
  if (!list) {
    return <Spin indicator={<LoadingOutlined />} />;
  }

  return (
    <>
      <QuestionSetViewHeader title={list?.questionSet?.title ?? ''} />
      <>
        <AverageDifficultyCircle />
        <p>
          This set contains {list.questions?.length} questions with the
          following tags:
        </p>
        <DistinctCategoryTags />
      </>
      <p>Questions in this set ({list.questions?.length}):</p>
      <List
        dataSource={list.questions}
        renderItem={(question: QuestionModel) => (
          <QuestionCard key={question.id} question={question} tagColor={'cyan'} />
        )}
      />
    </>
  );
}
