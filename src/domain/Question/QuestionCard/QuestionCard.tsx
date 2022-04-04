import { DeleteOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import React from 'react';

import { QuestionModel } from '../../../services/Client';
import styles from './QuestionCard.module.scss';

import { difficultyPercentageToColor } from '../../../services/mathUtils';

export default function QuestionCard({
  question,
  tagColor,
  deleteClickedCallback,
}: {
  question: QuestionModel;
  tagColor: string;
  deleteClickedCallback: (id: number) => void;
}): JSX.Element {
  const color = question.difficulty ? difficultyPercentageToColor(question.difficulty) : '#FFF';

  return (
    <div className={styles.questionCard} style={{ borderLeftColor: color }}>
      <span>{question.title}</span>
      <div>
        <Tag color={tagColor}>{question.category}</Tag>
        <DeleteOutlined onClick={() => question.id ? deleteClickedCallback(question.id) : null} style={{ color: 'red' }} />
      </div>
    </div >
  );
}
