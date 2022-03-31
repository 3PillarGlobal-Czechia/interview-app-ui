import { Timeline } from 'antd';
import React from 'react';

import { QuestionModel } from '../../services/Client';

export default function InterviewTimeline({
  questions,
  itemClickedCallback,
}: {
  questions: QuestionModel[];
  itemClickedCallback: (question: QuestionModel) => void;
}): JSX.Element {
  return (
    <Timeline>
      {questions.map((question) => (
        <Timeline.Item key={question.id}>
          <span
            role="presentation"
            onClick={() => itemClickedCallback(question)}
            onKeyDown={() => {
              // do nothing
            }}
          >
            {question.title}
          </span>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}
