import React from 'react';

import styles from './QuestionListCard.module.scss';

export default function AverageDifficulty({
  percent,
}: {
  percent: number | undefined;
}): JSX.Element {
  return (
    <div className={`${styles.averageDifficultyCircle} text-black`}>
      <h4>{percent}</h4>
      <span>Average Difficulty</span>
    </div>
  );
}
