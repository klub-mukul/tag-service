/* eslint-disable @typescript-eslint/no-non-null-assertion */
import './envSetup';

import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { logger } from './logger';

const SCHEMA = 'tag';

const config: Record<string, PostgresConnectionOptions> = {
  test: {
    // hard-coding test database as klub_test_db to prevent misuse
    database: 'klub_test_db',
    entities: ['dist/modules/**/*.entity{.ts,.js}'],
    extra: {
      max: 5,
      min: 2,
      cli: {
        migrationsDir: 'src/migrations',
      },
    }, // connection pool
    host: 'localhost',
    password: '',
    port: 5432,
    synchronize: true,
    // synchronize: false,
    logging: false,
    type: 'postgres',
    username: 'admin',
    namingStrategy: new SnakeNamingStrategy(),
    migrations: ['dist/migrations/*{.ts,.js}'],
    schema: SCHEMA,
    migrationsRun: false,
    // migrationsRun: true,
  },
  development: {
    database: process.env.POSTGRES_DB,
    entities: ['src/modules/**/*.entity{.ts,.js}'],
    extra: {
      max: 5,
      min: 2,
      cli: {
        migrationsDir: 'src/migrations',
      },

      //Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
    }, // connection pool
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    port: +process.env.POSTGRES_PORT!,
    synchronize: false,
    logging: true,
    type: 'postgres',
    username: process.env.POSTGRES_USER,
    namingStrategy: new SnakeNamingStrategy(),
    migrations: ['dist/migrations/*{.ts,.js}'],
    schema: SCHEMA,
  },
  production: {
    database: process.env.POSTGRES_DB,
    entities: ['dist/modules/**/*.entity{.ts,.js}'],
    extra: {
      max: 5,
      min: 2,
      cli: {
        migrationsDir: 'src/migrations',
      },
    }, // connection pool
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    port: +process.env.POSTGRES_PORT!,
    synchronize: false,
    logging: true,
    type: 'postgres',
    username: process.env.POSTGRES_USER,
    namingStrategy: new SnakeNamingStrategy(),
    migrations: ['dist/migrations/*{.ts,.js}'],
    schema: SCHEMA,
  },
};

/**
 * getRDBMSConfig
 * @param {(string | undefined)} env
 * @return {*}  {PostgresConnectionOptions}
 */
const getRDBMSConfig = (env: string | undefined): PostgresConnectionOptions => {
  if (!env) {
    // Setting default database to development
    env = 'development';
    logger.info(`Getting dbms config for ${env} environment`);

    return config.development;
  } else {
    const configuration: PostgresConnectionOptions = config[env];
    logger.info(
      `Connecting to database:${configuration.database} ********* schema:${configuration.schema}`,
    );

    return configuration;
  }
};

/**
 * rdbmsConfig
 * @type {*}
 */
const rdbmsConfig: PostgresConnectionOptions = getRDBMSConfig(
  process.env.NODE_ENV,
);
// eslint-disable-next-line
export default rdbmsConfig;
