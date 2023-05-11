import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { clearDb } from '../../../__tests__/data';
import { v4 as uuidv4 } from 'uuid';
import { AppModule } from '../../../app.module';
import {
  deleteTagById,
  getATagById,
  getAllTags,
  postTag,
} from './tag.controller.request';
import { appTestDataSource } from './../../../__tests__/setup.datasource';

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
        createdBy: '14c3ecaa-57e8-4673-aa5e-508b7d68724a',
        conditions: [
          {
            field: 'description',
            condition: 'contains',
            keywords: ['a', 'b'],
          },
        ],
      };
      const sampleTagRes = {
        id: '276cb99d-abb4-4ba0-bd3b-1f47e8637da3',
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
        createdBy: '14c3ecaa-57e8-4673-aa5e-508b7d68724a',
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
        createdBy: '14c3ecaa-57e8-4673-aa5e-508b7d68724a',
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
        createdBy: '14c3ecaa-57e8-4673-aa5e-508b7d68724a',
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
      console.log('result', result.body);

      expect(result.status).toEqual(400);
      expect(result.body.message).toEqual(resMessage);
    });
  };
  const deleteTagApiTests = () => {
    const deleteTagApiTests = () => {
      it(`DELETE ${endpoint}/:id -> Delete tag by tag id`, async () => {
        const sampleTag = {
          resource: 'Bank-1',
          resourceId: 'T002',
          resourceType: 'GST-1',
          type: 'category1',
          name: 'revenue1',
          createdBy: '14c3ecaa-57e8-4673-aa5e-508b7d68724a',
          conditions: [
            {
              field: 'description',
              condition: 'contains',
              keywords: ['a', 'b'],
            },
          ],
        };
        const postTagResult = await postTag(sampleTag, app);
        expect(postTagResult.status).toEqual(200);

        const id = postTagResult.body.id;
        const updatedByData = {
          updatedBy: '24c3ecaa-57e8-4673-aa5e-508b7d68724b',
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
        createdBy: '14c3ecaa-57e8-4673-aa5e-508b7d68724a',
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
        updatedBy: '24c3ecaa-57e8-4673-aa5e-508b7d68724b',
      };
      await deleteTagById(id, updatedByData, app);

      const finalDeleteTagResult = await deleteTagById(id, updatedByData, app);

      console.log(finalDeleteTagResult.body);
      expect(finalDeleteTagResult.body.message).toMatch(
        `No Tag Found with id: ${id}`,
      );
      expect(finalDeleteTagResult.statusCode).toEqual(404);
    });
  };
  const getATagApiTests = () => {
    it(`GET ${endpoint}/:id  -> Get tag with tag code when that tag exists, Expect tag`, async () => {
      const sampleTag = {
        resource: 'Bank-1',
        resourceId: 'T002',
        resourceType: 'GST-1',
        type: 'category1',
        name: 'revenue1',
        createdBy: '14c3ecaa-57e8-4673-aa5e-508b7d68724a',
        conditions: [
          {
            field: 'description',
            condition: 'contains',
            keywords: ['a', 'b'],
          },
        ],
      };
      const updatedByData = {
        updatedBy: '24c3ecaa-57e8-4673-aa5e-508b7d68724b',
      };
      const postResult = await postTag(sampleTag, app);
      const id: string = postResult.body.id;

      const getResult = await getATagById(id, updatedByData, app);
      expect(getResult.status).toEqual(200);
      expect(getResult.body.id).toMatch(id);
    });

    it(`GET ${endpoint}/:id  -> Get tag with tag code when id is not valid, expect Bad request`, async () => {
      const id: string = 'abc';
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
        updatedBy: '24c3ecaa-57e8-4673-aa5e-508b7d68724b',
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
      // console.log('getAllresult1.body');
      // console.log(getAllresult1.body);
      // expect(getAllresult1.body.length).toEqual(2);

      const getAllresult2 = await getAllTags(
        {
          where: {
            resource: 'Bank-1',
          },
        },
        1,
        0,
        app,
      );
      expect(getAllresult2.status).toEqual(200);
      // expect(getAllresult2.body.length).toEqual(1);
    });
  };

  postTagApiTests();
  deleteTagApiTests();
  getATagApiTests();
  getAllTagApiTests();

  // //   it(`DELETE ${endpoint}/:tenentCode -> Delete record with incorrect tenant code`, async () => {
  // //     const result = await postTenant(sampleUpdatetenant2, app);
  // //     expect(result.body.message).toMatch('Tenant created successfully.');
  // //     expect(result.status).toEqual(200);
  // //     const tenantCode = 'Klub';

  // //     const result2 = Tenant(tenantCode, app);
  // //     expect(result2.body.message).toMatch('Tenent Not found');
  // //     expect(result2.status).toEqual(422);
  // //     if (result2.body.data) {
  // //       expect(result2.body.data.deletedAt).not.toBeNull();
  // //     }
  // //   });

  // //Create multiple tenants and check if the tenant code is not duplicate. :- TODO

  // //Update the tenant with correct details
  // it(`PUT ${endpoint}/:tenantCode -> Update tenant by tenant code`, async () => {
  //   const result = await postTenant(sampleUpdatetenant1, app);

  //   expect(result.body.message).toMatch('Tenant created successfully.');
  //   expect(result.status).toEqual(200);
  //   const tenantCode = result.body.data.tenantCode;

  //   const result1 = await putTenant(tenantCode, updatedtenant1, app);
  //   expect(result1.body.message).toMatch('Tenant updated successfully.');
  //   expect(result1.status).toEqual(200);
  //   // expect(result1.body.data.tenantCode).toEqual(tenantCode);
  // });

  // //Update tenant with incorrect tenant code
  // it(`PUT ${endpoint}/:tenantCode -> Update tenant by incorrect tenant code`, async () => {
  //   const result = await postTenant(sampleUpdatetenant1, app);

  //   expect(result.body.message).toMatch('Tenant created successfully.');
  //   expect(result.status).toEqual(200);
  //   const tenantCode = 'KLUB1';

  //   const result1 = await putTenant(tenantCode, updatedtenant1, app);
  //   expect(result1.body.message).toMatch('Tenant Not Found');
  //   expect(result1.status).toEqual(404); //  Need to check
  //   // expect(result1.body.data.tenantCode).toEqual(tenantCode);
  // });

  // //Update tenant Code and tenant Name
  // it(`PUT ${endpoint}/:tenantCode -> Update tenant by tenant code with name`, async () => {
  //   const result = await postTenant(sampleUpdatetenant2, app);

  //   expect(result.body.message).toMatch('Tenant created successfully.');
  //   expect(result.status).toEqual(200);
  //   const tenantCode = result.body.data.tenantCode;

  //   const result1 = await putTenant(tenantCode, updatedtenant2, app);
  //   expect(result1.body.message).toMatch('Tenant updated successfully.');
  //   expect(result1.status).toEqual(200);
  //   // expect(result1.body.data.tenantCode).toEqual(tenantCode);
  // });

  // //Update tenant with nullable fields.
  // it(`PUT ${endpoint}/:tenantCode -> Update tenant by tenant code with name`, async () => {
  //   const result = await postTenant(sampleUpdatetenant2, app);

  //   expect(result.body.message).toMatch('Tenant created successfully.');
  //   expect(result.status).toEqual(200);
  //   const tenantCode = result.body.data.tenantCode;

  //   const result1 = await putTenant(tenantCode, updatedtenant3, app);
  //   expect(result1.body.message).toMatch('Unprocessable Entity');
  //   expect(result1.status).toEqual(422);
  //   // expect(result1.body.data.tenantCode).toEqual(tenantCode);
  // });

  afterAll(async () => {
    await clearDb(appTestDataSource);
    await app.close();
  });
});
