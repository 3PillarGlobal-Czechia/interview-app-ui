import { MouseEventHandler } from 'react';

import { QuestionSetModel } from '../../../services/Client';

export interface QuestionListCardSmallProps {
  list: QuestionSetModel;
  categories: JSX.Element[];
  onCardClickedCallback: MouseEventHandler;
}
