import { Injectable } from '@nestjs/common';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { logger } from '../../config/logger';

import rdbmsConfig from '../../config/rdbms';
// import { validateEnv } from 'src/utils/validate-env';

/**
 * ConfigService
 * @export
 * @class ConfigService
 */
@Injectable()
export class ConfigService {
  /**
   * constructor
   * Creates an instance of ConfigService.
   * @memberof ConfigService
   */
  constructor() {
    dotenv.config({
      path: '.env',
    });

    // validateEnv();

    // Replace \\n with \n to support multiline strings in AWS
    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
    }
  }

  /**
   * nodeEnv
   * @readonly
   * @type {string}
   * @memberof ConfigService
   */
  get nodeEnv(): string {
    return this.get('NODE_ENV') || 'development';
  }

  /**
   * isDevEnv
   * @readonly
   * @type {boolean}
   * @memberof ConfigService
   */
  get isDevEnv(): boolean {
    return this.nodeEnv === 'development';
  }

  /**
   * isTestEnv
   * @readonly
   * @type {boolean}
   * @memberof ConfigService
   */
  get isTestEnv(): boolean {
    return this.nodeEnv === 'test';
  }

  /**
   * get
   * @param {string} key
   * @return {*}  {string}
   * @memberof ConfigService
   */
  public get(key: string): string {
    return process.env[key];
  }

  /**
   * getNumber
   * @param {string} key
   * @return {*}  {number}
   * @memberof ConfigService
   */
  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  /**
   * typeOrmConfig
   * @readonly
   * @type {TypeOrmModuleOptions}
   * @memberof ConfigService
   */
  get typeOrmConfig(): TypeOrmModuleOptions {
    let entities = [__dirname + '/../../modules/**/*.entity{.ts,.js}'];
    let migrations = [__dirname + '/../../migrations/*{.ts,.js}'];

    if ((module as any).hot) {
      const entityContext = (require as any).context(
        './../../modules',
        true,
        /\.entity\.ts$/,
      );
      entities = entityContext.keys().map((id: any) => {
        const entityModule = entityContext(id);
        const [entity] = Object.values(entityModule);

        return entity;
      });
      const migrationContext = (require as any).context(
        './../../migrations',
        false,
        /\.ts$/,
      );
      migrations = migrationContext.keys().map((id: any) => {
        const migrationModule = migrationContext(id);
        const [migration] = Object.values(migrationModule);

        return migration;
      });
    }

    logger.info(
      `RDBMS config ${JSON.stringify({
        ...rdbmsConfig,
        entities,
        migrations,
      })}`,
    );

    return {
      ...rdbmsConfig,
      entities,
      migrations,
      autoLoadEntities: true,
      relationLoadStrategy: 'query',
    };
  }
}
