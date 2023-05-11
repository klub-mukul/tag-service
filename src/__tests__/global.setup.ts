/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import '../config/envSetup';
import 'reflect-metadata';

import { logger } from '../config/logger';
import createTestData from './data';
import { appTestDataSource } from './setup.datasource';

export default async () => {
  logger.info(
    'Executing the global init script *****************************************',
  );
  // Add tasks to be done before execution of all tests
  const connection = await appTestDataSource.initialize();
  await createTestData(connection);
};
