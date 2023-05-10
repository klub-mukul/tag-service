import type { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

/**
 * endpoint
 * @type {health}
 */
const endpoint = 'health';

/**
 * getServerHealth
 * @param {INestApplication} app
 * @return {*}  {Promise<request.Test>}
 */
export const getServerHealth = async (
  app: INestApplication,
): Promise<request.Test> =>
  request(app.getHttpServer())
    .get(`/${endpoint}`)
    .set('Accept', 'application/json');
