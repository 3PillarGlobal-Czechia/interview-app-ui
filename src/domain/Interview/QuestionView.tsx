import { Input, Rate } from 'antd';
import React, { useState } from 'react';

import { QuestionModel } from '../../services/Client';
import styles from './QuestionView.module.scss';

const { TextArea } = Input;

export default function InterviewQuestionView({
  question,
}: {
  question: QuestionModel;
}): JSX.Element {
  const [answer, setAnswer] = useState<string>();

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
      <TextArea
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows={4}
      />
    </div>
  );
}
