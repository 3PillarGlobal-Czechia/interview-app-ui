import { MouseEventHandler } from 'react';

import { Category, QuestionSetListItem } from '../../../services/Client';

export interface QuestionListCardLargeProps {
  list: QuestionSetListItem;
  tags: Category[];
  onCardClickedCallback: MouseEventHandler;
  moreIconContent: JSX.Element;
}
