/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-use-before-define */
/**
 * Use within 'connection' block in server to create test data
 */
import { DataSource } from 'typeorm';

import CircularStructure from '../common/helpers/CircularStructure';
import { logger } from '../config/logger';
import rdbmsConfig from '../config/rdbms';

/**
 * defaultEntitiesFields
 * @type {string[]} defaultEntitiesFields
 */
const defaultEntitiesFields: string[] = [];

/**
 * clearDb
 * @description truncate entity tables in database
 * @param {string[]} entitiesFiles
 */
export const clearDb = async (
  connection: DataSource,
  entitiesFiles: string[] = defaultEntitiesFields,
) => {
  const entities = connection.entityMetadatas;

  const schemaName = rdbmsConfig.schema ? rdbmsConfig.schema : 'public';
  logger.info('Clearing database tables started...');
  for (const entityName of entitiesFiles) {
    const entity = entities.find((x) => x.targetName === entityName);
    if (entity) {
      logger.info(`Clearing data from entity ${entity.targetName}`);
      const repository = connection.getRepository(entity.name);
      await repository.query(
        `DELETE FROM "${schemaName}"."${entity.tableName}" CASCADE;`,
      );
    } else {
      logger.info(`Entity not found with name: ${entityName}`);
    }
  }
  logger.info('Clearing database tables completed...');
};
/**
 * Function to setup Data in test database.
 * It first cleans up existing data and populates it after that.
 * @param appTestDataSource DataSource object
 */
const createTestData = async (appTestDataSource: DataSource) => {
  try {
    logger.info('Loading data...');
    if (!appTestDataSource.isInitialized) {
      logger.info('DataSource not initialized. Attempting to initialize');
      await appTestDataSource.initialize();
      logger.info(`after init ds ${appTestDataSource.isInitialized}`);
      // logger.info(`datasourceObjdatasourceObj not initialized ${JSON.stringify(appTestDataSource, CircularStructuer(), 2)}`);
    }
    await clearDb(appTestDataSource, ['TagEntity']);
    // await loadData(appTestDataSource);
  } catch (error) {
    logger.info(`Error while loading data ... ${error}`);
  }
};

// const loadData = async (connection: DataSource) => {
//   try {
//     logger.info('Loading Mock Data...');
//     // load transaction
//     await loadTransactionData(connection);
//     await loadloanData(connection); // need to change this
//   } catch (error) {
//     logger.error(`Failed to Load data ${JSON.stringify(error, CircularStructure(), 2)}`);
//   }
// };

export default createTestData;
