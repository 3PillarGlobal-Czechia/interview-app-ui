import { Timeline } from 'antd';
import React from 'react';

import { QuestionModel } from '../../services/Client';

export default function InterviewTimeline({
  questions,
  itemClickedCallback,
  questionRating,
}: {
  questions: QuestionModel[];
  itemClickedCallback: (question: QuestionModel) => void;
  questionRating: Map<number, number>;
}): JSX.Element {
  return (
    <Timeline>
      {questions.map((question) => {
        if (question.id) {
          const rating = questionRating.get(question.id);
          return (
            <Timeline.Item key={question.id}>
              <span
                role="presentation"
                onClick={() => itemClickedCallback(question)}
                onKeyDown={() => {
                  // do nothing
                }}
              >
                {question.title} {rating && `(${rating})`}
              </span>
            </Timeline.Item>
          );
        }
        return null;
      })}
    </Timeline>
  );
}
