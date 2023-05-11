import '../config/env.setup';
import 'reflect-metadata';

import { logger } from './../config/logger';
import createTestData from './data';

export default async () => {
  logger.info(
    'Executing the global init script *****************************************',
  );
  // Add tasks to be done before execution of all tests
  await createTestData();
};
