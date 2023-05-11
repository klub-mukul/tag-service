import '../config/envSetup';

import { logger } from '../config/logger';
import { appTestDataSource } from './setup.datasource';

beforeAll(async () => {
  try {
    if (!appTestDataSource.isInitialized) {
      await appTestDataSource.initialize();
    }
  } catch (error) {
    // no connection created yet, nothing to get
    logger.error('rdbms >>>> in setup >>> error >>> ', error);
  }

  try {
    // Add tasks to be performed before each test here
  } catch (error) {
    logger.error('rdbms >>>> in setup >>> error >>> ', error);
  }
});

afterAll(async () => {
  await appTestDataSource.destroy();
});
