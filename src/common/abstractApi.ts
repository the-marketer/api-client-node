import type { ApiContext } from './apiContext';

export abstract class AbstractApi {
  constructor(protected readonly context: ApiContext) {}
}
