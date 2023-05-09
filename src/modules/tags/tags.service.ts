import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { CreateTagDto } from './dto/createTag.dto';
import { GetTagDto } from './dto/getTag.dto';
import { Tag } from './tag.entity';
import { TagConditionsValidationException } from '../../exceptions/tagConditionsValidationException.exception';
import { NoTagFoundException } from '../../exceptions/noTagFoundException.exception';
import { ResourceValidationException } from '../../exceptions/resourceValidationException.exception';
import { TagRepository } from './tag.respository';
import { TagConditions } from './dto/tagConditions.dto';
import { UpdateTagDto } from './dto/updateTag.dto';
import createSlug from '../../utils/createSlug';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: TagRepository,
  ) {}

  mergeConditions(condition1: TagConditions[], condition2: TagConditions[]) {
    condition1[0].keywords = [
      ...new Set([...condition1[0].keywords, ...condition2[0].keywords]),
    ];
    return condition1;
  }

  async findByFields(fields: any) {
    return await this.tagRepository.find({
      where: { ...fields },
    });
  }

  async create(createTagDto: CreateTagDto) {
    console.log('createdBy : ' + createTagDto.createdBy);

    const slug: string = createSlug({ ...createTagDto });
    const createdBy = createTagDto.createdBy;
    const isStatic: boolean = createTagDto.conditions == null;

    const res = await this.findByFields({
      name: createTagDto.name,
      resource: createTagDto.resource,
      resourceId: createTagDto.resourceId,
      resourceType: createTagDto.resourceType,
      type: createTagDto.type,
    });

    const conditions: TagConditions[] = createTagDto.conditions;
    console.log(res);

    if (res.length == 0) {
      return await this.tagRepository.insert({
        ...createTagDto,
        createdBy: createdBy,
        updatedBy: createdBy,
        slug: slug,
        isStatic: isStatic,
        conditions: conditions,
      });
    }

    console.log(isStatic);
    if (isStatic == false) {
      // res[0].conditions = this.mergeConditions(res[0].conditions, createTagDto.conditions);
    }
    return this.tagRepository.save(res);
  }

  async find(id: string) {
    const res = await this.tagRepository.find({
      where: { id: id, deletedAt: null },
    });
    console.log(res);
    if (res.length == 0) {
      console.log('NULL');
      throw new NotFoundException('No Tag found');
    }
    return res;
  }

  async findAll(getDto: GetTagDto) {
    console.log(getDto);

    const res = await this.findByFields({
      name: getDto.name,
      resource: getDto.resource,
      resourceId: getDto.resourceId,
      resourceType: getDto.resourceType,
      type: getDto.type,
    });

    // console.log(res.length);
    // console.log(res);
    if (res.length == 0) {
      console.log('NULL');
      throw new NotFoundException('No Tag found');
    }
    return res;
  }

  async delete(id: string, updatedBy: string) {
    // console.log("initiated Deleted tag: "+ id);
    const todo = await this.tagRepository.findOne({ where: { id: id } });
    if (todo) {
      todo.updatedBy = updatedBy;
      await this.tagRepository.save(todo);
    } else {
      throw new NoTagFoundException(id);
    }

    await this.tagRepository.softDelete(id);

    // console.log("Deleted tag: "+ id);
    return response.status(HttpStatus.NO_CONTENT);
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    this.resourceValidation(
      updateTagDto.resourceId,
      updateTagDto.resourceType,
      updateTagDto.resource,
    );
    this.isStaticValidation(updateTagDto.isStatic, updateTagDto.conditions);

    const todo = await this.tagRepository.findOne({ where: { id: id } });

    if (!todo) {
      throw new NoTagFoundException(id);
    }

    const { isStatic, conditions } = todo;
    const { isStatic: updateIsStatic, conditions: updateConditions } =
      updateTagDto;

    if (isStatic && !updateIsStatic) {
      todo.isStatic = false;
      todo.conditions = updateConditions;
    } else if (!isStatic && updateIsStatic) {
      todo.isStatic = true;
    } else if (!isStatic && !updateIsStatic) {
      todo.conditions = await this.mergeConditions(
        conditions,
        updateConditions,
      );
    }

    todo.updatedBy = updateTagDto.updatedBy;
    return this.tagRepository.save(todo);
  }

  async resourceValidation(
    resourceId: string,
    resourceType: string,
    resource: string,
  ) {
    if (
      (resourceId == null && resourceType == null && resource == null) ||
      (resourceId != null && resourceType != null && resource != null)
    ) {
      return;
    }

    throw new ResourceValidationException(
      'resourceId, resourceType, resource are inconsistent',
    );
  }

  async isStaticValidation(isStatic: boolean, conditions: TagConditions[]) {
    if (conditions == null && isStatic == false) {
      throw new TagConditionsValidationException(
        'isStatic and conditions are inconsistent',
      );
    }
  }
}
