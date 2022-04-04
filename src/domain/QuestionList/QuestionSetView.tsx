import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

import { QuestionSetDetail } from '../../services/Client';
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
    </>
  );
}
