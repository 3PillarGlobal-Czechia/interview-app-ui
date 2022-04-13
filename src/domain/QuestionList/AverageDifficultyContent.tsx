import React from 'react';

import styles from './QuestionSetView.module.scss';

export default function AverageDifficultyContent({
  percent,
}: {
  percent?: number;
}): JSX.Element {
  return (
    <div className={`${styles.averageDifficultyCircle} text-black`}>
      <h4>{percent}</h4>
      <span>Average Difficulty</span>
    </div>
  );
}

AverageDifficultyContent.defaultProps = {
  percent: undefined,
};
