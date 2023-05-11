import { logger } from '../config/logger';

export default async () => {
  logger.info(
    'Executing the teardown script *****************************************',
  );
  // Add tasks to be done after execution of all tests
};
