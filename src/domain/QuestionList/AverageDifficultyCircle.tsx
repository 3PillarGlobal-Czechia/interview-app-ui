import { Progress } from 'antd';
import React from 'react';

import { difficultyPercentageToColor } from '../../helper/mathUtils';
import AverageDifficultyContent from './AverageDifficultyContent';

export default function AverageDifficultyCircle({
  percent,
}: {
  percent: number;
}): JSX.Element {
  const averageDifficultyContentElement = (
    percentage?: number
  ): JSX.Element => <AverageDifficultyContent percent={percentage} />;

  return (
    <Progress
      type="circle"
      format={averageDifficultyContentElement}
      percent={percent}
      strokeColor={difficultyPercentageToColor(percent ?? 0)}
    />
  );
}
