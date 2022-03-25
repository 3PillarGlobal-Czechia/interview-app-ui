import { ApiClient } from './ApiClient';

export class Client extends ApiClient {
  constructor() {
    super(process.env.REACT_APP_BACKEND_URL);
  }
}

export const QuestionModelProps = {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  id: 'id',
  title: 'title',
  difficulty: 'difficulty',
  category: 'category',
  content: 'content',
};

export * from './ApiClient';
