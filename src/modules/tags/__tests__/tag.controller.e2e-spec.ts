import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../app.module';
import { postTag } from './tag.controller.request';
import { logger } from '../../../config/logger';
import { log } from 'console';

const endpoint = '/tag';

const sampleTag1 = {
  resource: 'Bank-1',
  resourceId: 'T001',
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

// const sampleUpdatetenant1 = {
//   name: 'Test Tenant 1',
//   description: 'Tenant Description 1',
//   domain: 'Tenant Domain 1',
//   countryCode: '91',
//   additionalDetails: {
//     termsAndConditions: 'termsAndConditions 1',
//     privacyPolicy: 'privacyPolicy 1',
//     risk: 'risk 1',
//     cmsDetails: {
//       cmsDetails1: 'cmsDetails 1',
//       cmsDetails2: 'cmsDetails 2',
//     },
//   },
// };

describe('tags tests', () => {
  let app: INestApplication = null;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  //Create a new tenant with correct details
  it(`POST ${endpoint} -> Post new tag with tag code`, async () => {
    console.log('=======================&&&&&&&&&&&7===========');
    const result = await postTag(sampleTag1, app);

    console.log('result', result.body);

    // expect(result.body.message).toMatch('Tag created successfully.');
    // expect(result.status).toEqual(200);
    // expect(result.body.data.domain).toEqual(sampleTag1);
  });

  //Create a new tenant without tenant code
  // it(`POST ${endpoint} -> Post new tenant without tenant code`, async () => {
  //   const result = await postTenant(sampleTenant2, app);
  //   expect(result.body.message).toMatch('Tenant created successfully.');
  //   expect(result.status).toEqual(200);
  //   expect(result.body.data.domain).toEqual(sampleTenant2.domain);
  // });

  // //Create a tenant without name
  // it(`POST ${endpoint} -> Post new tenant without name`, async () => {
  //   const result = await postTenant(sampleTenant3, app);
  //   expect(result.body.message).toMatch('Unprocessable Entity');
  //   expect(result.status).toEqual(422);
  // });

  // //Create a tenant without domain
  // it(`POST ${endpoint} -> Post new tenant without domain`, async () => {
  //   const result = await postTenant(sampleTenant4, app);
  //   expect(result.body.message).toMatch('Unprocessable Entity');
  //   expect(result.status).toEqual(422);
  // });

  // //Create a tenant without countryCode
  // it(`POST ${endpoint} -> Post new tenant without country code`, async () => {
  //   const result = await postTenant(sampleTenant5, app);
  //   expect(result.body.message).toMatch('Unprocessable Entity');
  //   expect(result.status).toEqual(422);
  // });

  // //Create a tenant without additional details
  // it(`POST ${endpoint} -> Post new tenant without additional details`, async () => {
  //   const result = await postTenant(sampleTenant6, app);
  //   expect(result.body.message).toMatch('Tenant created successfully.');
  //   expect(result.status).toEqual(200);
  // });

  // //Create a tenant with incorrect datatype. //:-- TODO
  // //   it(`POST ${endpoint} -> Post new tenant with incorrect status type`, async () => {
  // //     const result = await postTenant(sampleTenant7, app);
  // //     expect(result.body.message).toMatch('Unprocessable Entity');
  // //     expect(result.status).toEqual(422);
  // //     expect(result.body.data.status).toEqual(StatusType.ACTIVE);
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

  // it(`DELETE ${endpoint}/:tenentCode -> Delete tenant by tenant code`, async () => {
  //   const result = await postTenant(sampleUpdatetenant1, app);
  //   expect(result.body.message).toMatch('Tenant created successfully.');
  //   expect(result.status).toEqual(200);

  //   const result2 = await deleteTenantByTenantCode(result.body.data.tenantCode, app);
  //   expect(result2.body.message).toMatch('Tenant deleted successfully.');
  //   expect(result2.status).toEqual(200);
  //   if (result2.body.data) {
  //     expect(result2.body.data.deletedAt).not.toBeNull();
  //   }
  // });

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

  afterAll(async () => {
    await app.close();
  });
});
