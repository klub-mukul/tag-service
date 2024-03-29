import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { clearDb } from '../../../__tests__/data';
import { v4 as uuidv4 } from 'uuid';
import { AppModule } from '../../../app.module';
import {
  deleteTagById,
  getATagById,
  getAllTags,
  patchTag,
  postTag,
} from './tag.controller.request';
import { appTestDataSource } from './../../../__tests__/setup.datasource';
import * as request from 'supertest';

const endpoint = '/tag';

describe('tags tests', () => {
  let app: INestApplication = null;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  // afterEach(async () => {
  //   await clearDb(['Tag']);
  // });

  const postTagApiTests = () => {
    it(`POST ${endpoint} -> Post new tag with tag code`, async () => {
      const sampleTag = {
        resource: 'Bank-1',
        resourceId: 'T002',
        resourceType: 'GST-1',
        type: 'category1',
        name: 'revenue1',
        createdBy: uuidv4(),
        conditions: [
          {
            field: 'description',
            condition: 'contains',
            keywords: ['a', 'b'],
          },
        ],
      };
      const sampleTagRes = {
        id: uuidv4(),
        name: 'revenue1',
        type: 'category1',
        resource: 'Bank-1',
        resourceId: 'T002',
        resourceType: 'GST-1',
        conditions: [
          { field: 'description', keywords: [Array], condition: 'contains' },
        ],
        isStatic: false,
        slug: 'revenue1-category1-Bank-1-GST-1-T001-46c57c3e-569d-4cb4-8b61-7681b450955d',
      };
      const result = await postTag(sampleTag, app);

      expect(result.status).toEqual(201);
      expect(result.body.name).toEqual(sampleTagRes.name);
      expect(result.body.type).toEqual(sampleTagRes.type);
      expect(result.body.conditions.length).toEqual(
        sampleTagRes.conditions.length,
      );
      expect(result.body.isStatic).toEqual(false);
      expect(result.body.resource).toEqual(sampleTagRes.resource);
      expect(result.body.resourceId).toEqual(sampleTagRes.resourceId);
      expect(result.body.resourceType).toEqual(sampleTagRes.resourceType);
    });

    it(`POST ${endpoint} -> Post new tag with no conditions should set isStatic false with status code 201`, async () => {
      const sampleTag = {
        resource: 'Bank-1',
        resourceId: 'T001',
        resourceType: 'GST-1',
        type: 'category1',
        name: 'revenue1',
        createdBy: uuidv4(),
      };
      const result = await postTag(sampleTag, app);

      expect(result.status).toEqual(201);
      expect(result.body.conditions.length).toEqual(0);
      expect(result.body.isStatic).toEqual(true);
    });

    it(`POST ${endpoint} -> Post new tag with no name will give 400 status code`, async () => {
      const sampleTag = {
        resource: 'Bank-1',
        resourceId: 'T001',
        resourceType: 'GST-1',
        type: 'category1',
        createdBy: uuidv4(),
        conditions: [
          {
            field: 'description',
            condition: 'contains',
            keywords: ['a', 'b'],
          },
        ],
      };
      const resMessage = [
        'name should not be null or undefined',
        'name should not be empty',
        'name must be a string',
      ];
      const result = await postTag(sampleTag, app);

      expect(result.status).toEqual(400);
      expect(result.body.message).toEqual(resMessage);
    });

    it(`POST ${endpoint} -> Post new tag with resource as Null, and resourceId,resourceType !null will give 400 status code`, async () => {
      const sampleTag = {
        name: 'revenue1',
        resourceId: 'T001',
        resourceType: 'GST-1',
        type: 'category1',
        createdBy: uuidv4(),
        conditions: [
          {
            field: 'description',
            condition: 'contains',
            keywords: ['a', 'b'],
          },
        ],
      };
      const resMessage = 'resourceId, resourceType, resource are inconsistent';
      const result = await postTag(sampleTag, app);
      // console.log('result', result.body);

      expect(result.status).toEqual(400);
      expect(result.body.message).toEqual(resMessage);
    });
  };

  const deleteTagApiTests = () => {
    it(`DELETE ${endpoint}/:id -> Delete tag by tag id`, async () => {
      const sampleTag = {
        resource: 'Bank-1',
        resourceId: 'T002',
        resourceType: 'GST-1',
        type: 'category1',
        name: 'revenue1',
        createdBy: uuidv4(),
        conditions: [
          {
            field: 'description',
            condition: 'contains',
            keywords: ['a', 'b'],
          },
        ],
      };
      const postTagResult = await postTag(sampleTag, app);
      expect(postTagResult.status).toEqual(201);

      const id = postTagResult.body.id;
      const updatedByData = {
        updatedBy: uuidv4(),
      };
      const deleteTagResult = await deleteTagById(id, updatedByData, app);
      expect(deleteTagResult.body.message).toMatch(
        `Successfully deleted tag with id: ${id}`,
      );
      expect(deleteTagResult.body.status).toEqual(200);
    });
  };
  it(`DELETE ${endpoint}/:id -> Deleting an already deleted tag`, async () => {
    const sampleTag = {
      resource: 'Bank-1',
      resourceId: 'T002',
      resourceType: 'GST-1',
      type: 'category1',
      name: 'revenue1',
      createdBy: uuidv4(),
      conditions: [
        {
          field: 'description',
          condition: 'contains',
          keywords: ['a', 'b'],
        },
      ],
    };
    const postTagResult = await postTag(sampleTag, app);
    expect(postTagResult.status).toEqual(201);

    const id = postTagResult.body.id;
    const updatedByData = {
      updatedBy: uuidv4(),
    };
    await deleteTagById(id, updatedByData, app);

    const finalDeleteTagResult = await deleteTagById(id, updatedByData, app);

    // console.log(finalDeleteTagResult.body);
    expect(finalDeleteTagResult.body.message).toMatch(
      `No Tag Found with id: ${id}`,
    );
    expect(finalDeleteTagResult.statusCode).toEqual(404);
  });
  const getATagApiTests = () => {
    it(`GET ${endpoint}/:id  -> Get tag with tag code when that tag exists, Expect tag`, async () => {
      const sampleTag = {
        resource: 'Bank-1',
        resourceId: 'T002',
        resourceType: 'GST-1',
        type: 'category1',
        name: 'revenue1',
        createdBy: uuidv4(),
        conditions: [
          {
            field: 'description',
            condition: 'contains',
            keywords: ['a', 'b'],
          },
        ],
      };
      const updatedByData = {
        updatedBy: uuidv4(),
      };
      const postResult = await postTag(sampleTag, app);
      const id: string = postResult.body.id;

      const getResult = await getATagById(id, updatedByData, app);
      expect(getResult.status).toEqual(200);
      expect(getResult.body.id).toMatch(id);
    });

    it(`GET ${endpoint}/:id  -> Get tag with tag code when id is not valid, expect Bad request`, async () => {
      const id = 'abc';
      const updatedByData = {
        updatedBy: uuidv4(),
      };
      const getResult = await getATagById(id, updatedByData, app);
      expect(getResult.status).toEqual(400);
      expect(getResult.body.message).toMatch(
        'Validation failed (uuid is expected)',
      );
    });

    it(`GET ${endpoint}/:id  -> Get tag with tag code when that doesn't exists`, async () => {
      const id: string = uuidv4();
      const updatedByData = {
        updatedBy: uuidv4(),
      };
      const getResult = await getATagById(id, updatedByData, app);
      expect(getResult.status).toEqual(404);
      expect(getResult.body.message).toEqual(`No Tag Found with id: ${id}`);
    });
  };
  const getAllTagApiTests = () => {
    it(`GET ${endpoint} => Get all tags with query parameters`, async () => {
      const sampleTag1 = {
        type: 'category1',
        name: 'revenue1',
        resource: 'Bank-1',
        resourceId: 'T001',
        resourceType: uuidv4(),
        createdBy: uuidv4(),
      };
      const sampleTag2 = {
        type: 'category1',
        name: 'revenue1',
        resource: 'Bank-2',
        resourceId: 'T001',
        resourceType: uuidv4(),
        createdBy: uuidv4(),
      };

      const result1 = await postTag(sampleTag1, app);
      const result2 = await postTag(sampleTag2, app);
      expect(result1.status).toEqual(201);
      expect(result2.status).toEqual(201);

      const getAllresult1 = await getAllTags(
        {
          where: {
            type: 'category1',
            name: 'revenue1',
          },
        },
        1,
        0,
        app,
      );
      expect(getAllresult1.status).toEqual(200);
      expect(getAllresult1.body.length).toBeGreaterThan(1);

      const getAllresult2 = await getAllTags(
        {
          where: {
            type: 'category1',
          },
        },
        1,
        0,
        app,
      );
      expect(getAllresult2.status).toEqual(200);
      expect(getAllresult2.body.length).toBeGreaterThan(1);
    });
  };
  const patchTagApiTests = () => {
    it(`Update ${endpoint} -> Add keywords of conditions of a tag with tag id, expect 200`, async () => {
      const sampleTag = {
        resource: 'Bank-10',
        resourceId: 'T002',
        resourceType: 'GST-1',
        type: 'category1',
        name: 'revenue1',
        createdBy: uuidv4(),
        conditions: [
          {
            field: 'description',
            condition: 'contains',
            keywords: ['a', 'b'],
          },
        ],
      };
      const sampleTag2 = {
        resource: 'Bank-10',
        resourceId: 'T002',
        resourceType: 'GST-1',
        type: 'category1',
        name: 'revenue1',
        updatedBy: uuidv4(),
        conditions: [
          {
            field: 'description',
            condition: 'contains',
            keywords: ['c'],
          },
        ],
      };
      const postTagResult = await postTag(sampleTag, app);
      expect(postTagResult.status).toEqual(201);
      const id = postTagResult.body.id;

      const patchTagResult = await patchTag(id, sampleTag2, app);
      expect(patchTagResult.status).toEqual(200);
      expect(patchTagResult.body.id).toEqual(id);
      expect(patchTagResult.body.conditions).toBeDefined();
      expect(patchTagResult.body.conditions.length).toEqual(1);
      expect(patchTagResult.body.conditions[0].keywords).toEqual([
        'a',
        'b',
        'c',
      ]);
      expect(patchTagResult.body.isStatic).toEqual(false);
    });

    it(`Update ${endpoint} -> Update conditions of a tag with tag id, expect 200`, async () => {
      const sampleTag = {
        resource: 'Bank-101',
        resourceId: 'T002',
        resourceType: 'GST-1',
        type: 'category1',
        name: 'revenue1',
        createdBy: uuidv4(),
        conditions: [
          {
            field: 'description',
            condition: 'contains',
            keywords: ['a', 'b'],
          },
        ],
      };
      const sampleTag2 = {
        resource: 'Bank-101',
        resourceId: 'T002',
        resourceType: 'GST-1',
        type: 'category1',
        name: 'revenue1',
        updatedBy: uuidv4(),
      };
      const sampleTag3 = {
        resource: 'Bank-101',
        resourceId: 'T002',
        resourceType: 'GST-1',
        type: 'category1',
        name: 'revenue1',
        updatedBy: uuidv4(),
        conditions: [
          {
            field: 'description',
            condition: 'contains',
            keywords: ['a', 'b'],
          },
        ],
      };
      const postTagResult = await postTag(sampleTag, app);
      expect(postTagResult.status).toEqual(201);
      const id = postTagResult.body.id;

      const patchTagResult1 = await patchTag(id, sampleTag2, app);
      expect(patchTagResult1.body.id).toEqual(id);
      expect(patchTagResult1.status).toEqual(200);
      expect(patchTagResult1.body.conditions).toBeDefined();
      expect(patchTagResult1.body.conditions.length).toEqual(0);
      expect(patchTagResult1.body.isStatic).toEqual(true);

      const patchTagResult2 = await patchTag(id, sampleTag3, app);
      expect(patchTagResult2.status).toEqual(200);
      expect(patchTagResult2.body.id).toEqual(id);
      expect(patchTagResult2.body.conditions.length).toEqual(1);
      expect(patchTagResult2.body.conditions).toBeDefined();
      expect(patchTagResult2.body.conditions).toEqual(sampleTag3.conditions);
      expect(patchTagResult2.body.isStatic).toEqual(false);
    });

    it(`Update ${endpoint} -> Patch keywords of conditions of a tag with wrong resource fields, expect 400`, async () => {
      const sampleTag = {
        resource: 'Bank-10',
        resourceId: 'T002',
        resourceType: 'GST-1',
        type: 'category1',
        name: 'revenue1',
        createdBy: uuidv4(),
        conditions: [
          {
            field: 'description',
            condition: 'contains',
            keywords: ['a', 'b'],
          },
        ],
      };
      const sampleTag2 = {
        resource: 'Bank-10',
        resourceId: 'T002',
        type: 'category1',
        name: 'revenue1',
        updatedBy: uuidv4(),
        conditions: [
          {
            field: 'description',
            condition: 'contains',
            keywords: ['c'],
          },
        ],
      };
      const postTagResult = await postTag(sampleTag, app);
      expect(postTagResult.status).toEqual(201);
      const id = postTagResult.body.id;

      const patchTagResult = await patchTag(id, sampleTag2, app);
      expect(patchTagResult.status).toEqual(400);
      expect(patchTagResult.body.message).toMatch(
        'resourceId, resourceType, resource are inconsistent',
      );
    });
  };
  const bulkUploadTagApiTests = () => {
    console.log(__dirname);
    const filePath = `${__dirname}/uploads/tags-bulk-upload.csv`;
    const createdByData = {
      createdBy: uuidv4(),
    };
    it(`POST ${endpoint}/:id  -> Create tags with .csv file having tag details and no createdBy, expect 400`, async () => {
      const response = await request(app.getHttpServer())
        .post(`${endpoint}/bulk-upload`)
        .attach('file', filePath);

      expect(response.status).toEqual(400);
      expect(response.body.message).toEqual(
        'The value passed as UUID is not a string',
      );
    });

    // it(`POST ${endpoint}/:id  -> Create tags with .csv file having tag details and createdBy, expect 200`, async () => {
    //   const response = await request(app.getHttpServer())
    //     .post(`${endpoint}/bulk-upload`)
    //     // .set('createdBy', uuidv4())
    //     .attach('file', filePath)
    //     .field('body', createdByData.createdBy);

    //   expect(response.status).toEqual(200);
    //   expect(response.body.message).toEqual(
    //     'The value passed as UUID is not a string',
    //   );
    // });
  };

  postTagApiTests();
  deleteTagApiTests();
  getATagApiTests();
  getAllTagApiTests();
  patchTagApiTests();
  bulkUploadTagApiTests();

  afterAll(async () => {
    await clearDb(appTestDataSource);
    await app.close();
  });
});
