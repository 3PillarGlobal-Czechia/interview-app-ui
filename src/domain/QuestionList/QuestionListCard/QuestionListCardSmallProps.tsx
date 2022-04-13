import { MouseEventHandler } from 'react';

import { QuestionSetListItem } from '../../../services/Client';

export interface QuestionListCardSmallProps {
  list: QuestionSetListItem;
  categories: string[];
  onCardClickedCallback: MouseEventHandler;
}
