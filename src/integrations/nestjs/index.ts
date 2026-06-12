export {
  TheMarketerModule,
  THE_MARKETER_CLIENT,
  type TheMarketerModuleAsyncOptions,
} from './theMarketer.module';
// Re-exported for convenience so consumers can import the client type from the
// same entry point they import the module from.
export { Client } from '../../client';
export type { ClientConfig } from '../../client';
