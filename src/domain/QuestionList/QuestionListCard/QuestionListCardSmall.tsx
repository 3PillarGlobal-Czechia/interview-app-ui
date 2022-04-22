import React from 'react';

import TagList from '../../../components/TagList';
import styles from './QuestionListCard.module.scss';
import { QuestionListCardSmallProps } from './QuestionListCardSmallProps';

export default function QuestionListCardSmall(
  props: QuestionListCardSmallProps
): JSX.Element {
  const { list, tags, onCardClickedCallback } = props;

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

      <TagList tags={tags} />
    </div>
  );
}
