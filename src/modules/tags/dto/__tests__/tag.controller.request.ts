import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

const endpoint = '/tag';

export const postTag = async (data: any, app: INestApplication) =>
  request(app.getHttpServer())
    .post(`${endpoint}`)
    .send(data)
    .set('Accept', 'application/json');

export const putTenant = async (
  tenantCode: string,
  data: any,
  app: INestApplication,
) =>
  request(app.getHttpServer())
    .put(`${endpoint}/${tenantCode}`)
    .send(data)
    .set('Accept', 'application/json');

export const deleteTenantByTenantCode = async (
  tenantCode: string,
  app: INestApplication,
) =>
  request(app.getHttpServer())
    .delete(`${endpoint}/${tenantCode}`)
    .set('Accept', 'application/json');
