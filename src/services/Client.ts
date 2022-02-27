import { ApiClient } from './ApiClient';

export class Client extends ApiClient {
  constructor() {
    super(process.env.REACT_APP_BACKEND_URL);
  }
}

export * from './ApiClient';
