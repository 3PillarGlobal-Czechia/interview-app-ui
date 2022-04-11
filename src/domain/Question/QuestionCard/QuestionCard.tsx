import { DeleteOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import React from 'react';

import { QuestionModel } from '../../../services/Client';
import { difficultyPercentageToColor } from '../../../helper/mathUtils';
import { colorByCategory } from '../../../services/tagCategoryColorService';
import styles from './QuestionCard.module.scss';

export default function QuestionCard({
  question,
  deleteClickedCallback,
}: {
  question: QuestionModel;
  deleteClickedCallback: (id: number) => void;
}): JSX.Element {
  const color = question.difficulty
    ? difficultyPercentageToColor(question.difficulty)
    : '#FFF';

  return (
    <div className={styles.questionCard} style={{ borderLeftColor: color }}>
      <span>{question.title}</span>
      <div>
        <Tag color={colorByCategory(question.category ?? '')}>
          {question.category}
        </Tag>
        <DeleteOutlined
          onClick={() =>
            question.id ? deleteClickedCallback(question.id) : null
          }
          style={{ color: 'red' }}
        />
      </div>
    </div>
  );
}
