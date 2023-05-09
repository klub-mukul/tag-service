import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagRepository } from './tag.respository';

@Module({
  controllers: [TagsController],
  providers: [TagsService, TagRepository],
  imports: [TypeOrmModule.forFeature([Tag])],
})
export class TagsModule {}
