import { logger } from '../config/logger';
import { clearDb } from './data';
import { appTestDataSource } from './setup.datasource';

export default async () => {
  logger.info(
    'Executing the teardown script *****************************************',
  );
  // Add tasks to be done after execution of all tests
  logger.info(
    '$$$$$$$$$$$$$$$$$ -> Cleaning test database <- $$$$$$$$$$$$$$$$$$$$$$$$$',
  );
  await clearDb(appTestDataSource);

  logger.info(
    '$$$$$$$$$$$$$$$$$ -> Test database has been cleaned <- $$$$$$$$$$$$$$$$$',
  );
};
