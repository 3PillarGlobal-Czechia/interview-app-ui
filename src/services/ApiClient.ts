import { Client } from './GeneratedClient';

export class ApiClient extends Client {
  constructor() {
    super(process.env.REACT_APP_BACKEND_URL);
  }
}

export * from './GeneratedClient';
