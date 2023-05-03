import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
// console.log(process.env)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  // console.log(process.env.PORT);
}
bootstrap();
