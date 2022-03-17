import { MouseEventHandler } from 'react';

import { QuestionListModel } from '../../../services/Client';

export interface QuestionListCardLargeProps {
  list: QuestionListModel;
  categories: JSX.Element[];
  onCardClickedCallback: MouseEventHandler;
  moreIconContent: JSX.Element;
}
