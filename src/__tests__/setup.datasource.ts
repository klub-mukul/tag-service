import { DataSource, DataSourceOptions } from 'typeorm';

import CircularStructure from '../common/helpers/CircularStructure';
import { logger } from '../config/logger';
import rdbmsConfig from '../config/rdbms';
const dataSourceOptions: DataSourceOptions = {
  ...rdbmsConfig,
};

logger.info(
  `rdbms config: ${JSON.stringify(rdbmsConfig, CircularStructure(), 2)}`,
);

export const appTestDataSource = new DataSource(dataSourceOptions);
