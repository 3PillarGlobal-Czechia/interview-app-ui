import { DeleteOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import React from 'react';

import { difficultyPercentageToColor } from '../../../helper/mathUtils';
import { QuestionModel } from '../../../services/Client';
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
        <Button shape="circle">
          <DeleteOutlined
            onClick={() =>
              question.id ? deleteClickedCallback(question.id) : null
            }
            style={{ color: 'red' }}
          />
        </Button>
      </div>
    </div>
  );
}
