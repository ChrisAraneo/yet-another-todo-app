import { environment as developmentEnvironment } from './environment.development';
import { Environment } from './environment.interface';

// TODO Production environment

export const environment: Environment = {
  ...developmentEnvironment,
};
