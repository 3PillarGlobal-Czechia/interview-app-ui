import { MouseEventHandler } from 'react';

import { QuestionListModel } from '../../../services/Client';

export interface QuestionListCardSmallProps {
  list: QuestionListModel;
  categories: JSX.Element[];
  onCardClickedCallback: MouseEventHandler;
}
