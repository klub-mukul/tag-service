import { DataSource } from 'typeorm';

import rdbmsConfig from './rdbms';
import { logger } from './logger';

logger.info('inside ds export');
logger.info(rdbmsConfig);
export const dataSource = new DataSource(rdbmsConfig);
