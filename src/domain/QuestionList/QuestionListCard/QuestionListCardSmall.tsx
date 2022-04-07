import React from 'react';

import styles from './QuestionListCard.module.scss';
import { QuestionListCardSmallProps } from './QuestionListCardSmallProps';

export default function QuestionListCardSmall(
  props: QuestionListCardSmallProps
): JSX.Element {
  const { list, categories, onCardClickedCallback } = props;

  return (
    <div
      role="presentation"
      onClick={onCardClickedCallback}
      onKeyDown={() => {
        // do nothing
      }}
      className={styles.card}
    >
      <h4>{list.questionSet?.title}</h4>
      <div className={styles.categories}>{categories}</div>
    </div>
  );
}
