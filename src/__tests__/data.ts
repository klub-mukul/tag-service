/**
 * Use within 'connection' block in server to create test data
 */
import { createConnection, getConnection } from 'typeorm';

import { logger } from './../config/logger';
import rdbms from './../config/rdbms';

// truncate entity tables in database
/**
 * clearDb
 * @param {string[]} entitiesFiles
 */
export const clearDb = async (entitiesFiles: string[]) => {
  const connection = getConnection();
  const entities = connection.entityMetadatas;
  const schemaName = rdbms.schema;
  logger.info('Clearing database tables started...');
  // Configure entities to be cleared below
  for (const entityName of entitiesFiles) {
    const entity = entities.find((x) => x.targetName === entityName);
    if (entity) {
      logger.info(`Clearing data from entity ${entity.targetName}`);
      const repository = connection.getRepository(entity.name);
      await repository.query(
        `DELETE FROM "${schemaName}"."${entity.tableName}" CASCADE;`,
      );
    } else {
      logger.info(
        `Entity not found with name: ${
          (entity as any)?.targetName || entityName
        }`,
      );
    }
  }
  logger.info('Clearing database tables completed...');
};

/**
 * loadData
 */
const loadData = async () => {
  logger.info('Now creating test data ...');
  const entitiesFiles: string[] = ['Tag'];
  // now setup test data
  await clearDb(entitiesFiles);
  logger.info('Successfully set up test data...');
};

/**
 * Run this once but if data already exists
 *
 * @param connection
 */
const createTestData = async () => {
  logger.info('Loading data ...');
  let connection;
  try {
    connection = await createConnection(rdbms);
    if (!connection.isConnected) {
      await connection.connect();
    }
  } catch {
    // no connection created yet, nothing to get
    connection = await createConnection(rdbms);
  }
  await loadData();
};

// eslint-disable-next-line import/no-default-export
export default createTestData;
