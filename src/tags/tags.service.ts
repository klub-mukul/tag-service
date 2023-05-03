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
    private readonly tagRepository: TagRepository) {
  }

  async create(createTagDto: CreateTagDto, createdBy: string) {
    console.log(createdBy);
    
    const slug: string = Tag.createSlug({...createTagDto});
    
    const isStatic: boolean = createTagDto.conditions == null;

    return await this.tagRepository.insert({
      ...createTagDto,
      createdBy: createdBy,
      updatedBy: createdBy,
      slug: slug,
      isStatic: isStatic
    });
  }

  // findAll(){}


  // findOne(id: number) {
  //   return this.tagRepository.findOne({
  //     where{
  //       id: id,
        
  //     }, select
  //   });
  // }

  // update(id: number, updateTagDto: UpdateTagDto) {
  //   return `This action updates a #${id} tag`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} tag`;
  // }
}
