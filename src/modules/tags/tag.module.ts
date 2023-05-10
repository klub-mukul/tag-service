import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagRepository } from './tag.respository';

/**
 * TagModule
 * @export
 * @class TagModule
 */
@Module({
  controllers: [TagController],
  providers: [TagService, TagRepository],
  imports: [TypeOrmModule.forFeature([Tag])],
})
export class TagModule {}
