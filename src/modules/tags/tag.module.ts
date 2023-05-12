import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { TagRepository } from './tag.respository';

/**
 * TagModule
 * @export
 * @class TagModule
 */
@Module({
  controllers: [TagController],
  providers: [TagService, TagRepository],
  imports: [TypeOrmModule.forFeature([TagEntity])],
})
export class TagModule {}
