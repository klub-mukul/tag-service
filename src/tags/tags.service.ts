import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './create-tag.dto';
import { UpdateTagDto } from './update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TagRepository } from './tag.respository';
import { Tag } from './tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) 
    private readonly tagRepository: TagRepository){
    }

  create(createTagDto: CreateTagDto){
    return this.tagRepository.insert(createTagDto);
  }

  findAll() {
    return `This action returns all tags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
