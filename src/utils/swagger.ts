import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
// import {
//   INTERNAL_API_SECURITY,
//   INTERNAL_AUTH0_API_SECURITY,
// } from 'src/common/constants/strings/index';

const INTERNAL_AUTH0_API_SECURITY = 'Internal Auth0 API';
const INTERNAL_API_SECURITY = 'Internal API';

/**
 * setupSwagger
 * @export
 * @param {INestApplication} app
 */
export function setupSwagger(app: INestApplication) {
  const serverUrl =
    process.env.STAGE === 'stg'
      ? 'https://staging-api.klubworks.com'
      : 'https://dev-api.klubworks.com';
  const options = new DocumentBuilder()
    .setTitle('User Management Service API for Klubworks')
    .setDescription(
      'This swagger documentation includes the user service API for portal.',
    )
    .addTag('Klub User Service')
    .setVersion('1.0.0')
    // .addBearerAuth()
    .addSecurity(INTERNAL_AUTH0_API_SECURITY, {
      type: 'apiKey',
      description: '<b>Internal Auth0 Rule Key:</b>',
      name: 'auth0-rule-key',
      in: 'header',
    })
    .addSecurity(INTERNAL_API_SECURITY, {
      type: 'apiKey',
      description: '<b>Internal API Key:</b>',
      name: 'internal-api-key',
      in: 'header',
    })
    // .addServer(serverUrl)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  fs.writeFileSync('./swagger-doc.json', JSON.stringify(document));
  SwaggerModule.setup('api-docs', app, document);
}
