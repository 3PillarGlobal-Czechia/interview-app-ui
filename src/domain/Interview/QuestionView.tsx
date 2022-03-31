import { Rate } from 'antd';
import React from 'react';

import { QuestionModel } from '../../services/Client';
import styles from './QuestionView.module.scss';

export default function InterviewQuestionView({
  question,
}: {
  question: QuestionModel;
}): JSX.Element {
  return (
    <div className={styles.questionView}>
      <div>
        <div>
          <p>{question.title}</p>
          <p>{question.category}</p>
          <Rate disabled value={question.difficulty} />
        </div>
        <p>{question.content}</p>
      </div>
    </div>
  );
}
