import { MouseEventHandler } from 'react';

import { QuestionSetModel } from '../../../services/Client';

export interface QuestionListCardLargeProps {
  list: QuestionSetModel;
  categories: JSX.Element[];
  onCardClickedCallback: MouseEventHandler;
  moreIconContent: JSX.Element;
}
