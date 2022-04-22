import { MouseEventHandler } from 'react';

import { Category, QuestionSetListItem } from '../../../services/Client';

export interface QuestionListCardSmallProps {
  list: QuestionSetListItem;
  tags: Category[];
  onCardClickedCallback: MouseEventHandler;
}
