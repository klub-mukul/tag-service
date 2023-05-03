import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags/tags.module';
import { Tag } from './tags/entities/tag.entity';

@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'admin',
        password: '',
        database: 'tags',
        entities: [Tag],
        synchronize: true,
      }),
      TagsModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(){}
}