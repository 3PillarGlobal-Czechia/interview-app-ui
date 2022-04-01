import { MouseEventHandler } from 'react';

import { QuestionSetListItem } from '../../../services/Client';

export interface QuestionListCardLargeProps {
  list: QuestionSetListItem;
  categories: JSX.Element[];
  onCardClickedCallback: MouseEventHandler;
  moreIconContent: JSX.Element;
}
