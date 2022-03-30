import { Timeline } from 'antd';
import React from 'react';

import { QuestionModel } from '../../services/Client';

export default function InterviewTimeline({
  questions,
}: {
  questions: QuestionModel[];
}): JSX.Element {
  return (
    <Timeline>
      {questions.map((question) => (
        <Timeline.Item>{question.title}</Timeline.Item>
      ))}
    </Timeline>
  );
}
