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

export const deleteTagById = async (
  id: string,
  updatedByData: any,
  app: INestApplication,
) =>
  request(app.getHttpServer())
    .delete(`${endpoint}/${id}`)
    .send(updatedByData)
    .set('Accept', 'application/json');

export const getATagById = async (
  id: string,
  updatedByData: any,
  app: INestApplication,
) =>
  request(app.getHttpServer())
    .get(`${endpoint}/${id}`)
    .send(updatedByData)
    .set('Accept', 'application/json');

export const getAllTags = async (
  query: Record<string, any>,
  take: number,
  page: number,
  app: INestApplication,
): Promise<request.Test> =>
  request(app.getHttpServer())
    .get(`${endpoint}`)
    .query({ ...query, take, page })
    .set('Accept', 'application/json');
