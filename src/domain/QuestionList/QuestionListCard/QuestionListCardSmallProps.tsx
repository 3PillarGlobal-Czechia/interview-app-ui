import { MouseEventHandler } from 'react';

import { QuestionSetDetail } from '../../../services/Client';

export interface QuestionListCardSmallProps {
  list: QuestionSetDetail;
  categories: JSX.Element[];
  onCardClickedCallback: MouseEventHandler;
}
