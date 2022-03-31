import { InputNumber, Rate } from 'antd';
import React, { useState } from 'react';

import { QuestionModel } from '../../services/Client';
import styles from './QuestionView.module.scss';

export default function InterviewQuestionView({
  question,
}: {
  question: QuestionModel;
}): JSX.Element {
  const [value, setValue] = useState<number>();

  return (
    <div className={styles.questionView}>
      <div>
        <div>
          <p>{question.title}</p>
          <p>{question.category}</p>
          <Rate disabled value={question.difficulty} />
        </div>
        <div>
          <span>{question.content}</span>
          <div>
            <span>Rate answer (1 - 10)</span>
            <InputNumber min={1} max={10} value={value} onChange={setValue} />
          </div>
        </div>
      </div>
    </div>
  );
}
