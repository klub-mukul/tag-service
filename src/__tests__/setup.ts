import '../config/env.setup';

import type { Connection } from 'typeorm';
import { createConnection } from 'typeorm';

import { logger } from './../config/logger';
import rdbms from './../config/rdbms';

beforeAll(async () => {
  let connection: Connection;
  try {
    logger.info('rdbms >>>> in setup >>> ', rdbms);
    connection = await createConnection(rdbms);
    if (!connection.isConnected) {
      await connection.connect();
    }
  } catch {
    // no connection created yet, nothing to get
    connection = await createConnection(rdbms);
  }
});

afterAll(async () => {
  // await getConnection().close();
});
