import {
  HttpStatus,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { CreateTagDto } from './dto/createTag.dto';
import { GetTagDto } from './dto/getTag.dto';
import { Tag } from './tag.entity';
import { TagConditionsValidationException } from '../../exceptions/tagConditionsValidationException.exception';
import { NoTagFoundException } from '../../exceptions/noTagFoundException.exception';
import { UnmatchingTagDetailsValidationException } from '../../exceptions/unmatchingTagDetailsValidationException.exception';

import { TagRepository } from './tag.respository';
import { TagConditions } from './dto/tagConditions.dto';
import { UpdateTagDto } from './dto/updateTag.dto';
import createSlug from '../../utils/createSlug';
import { ResponseTagDto } from './dto/responseTag.dto';
import { CreatedByDto } from 'src/common/dto/createdBy.dto';
import resourceValidation from './dto/validations/resourceValidation.validation';
import { log } from 'console';
import createCoreFieldsString from './../../utils/createCoreFieldsString';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: TagRepository,
  ) {}

  mergeConditions(
    firstCondition: TagConditions[],
    secondCondition: TagConditions[],
  ) {
    if (firstCondition.length == 0) {
      return secondCondition;
    } else if (secondCondition.length == 0) {
      return firstCondition;
    }

    firstCondition[0].keywords = [
      ...new Set([
        ...firstCondition[0].keywords,
        ...secondCondition[0].keywords,
      ]),
    ];
    return firstCondition;
  }

  async findByFields(fields: any) {
    return await this.tagRepository.find({
      where: { ...fields },
    });
  }

  async create(createTagDto: CreateTagDto): Promise<ResponseTagDto> {
    const slug: string = createSlug({ ...createTagDto });
    const createdBy = createTagDto.createdBy;
    const createIsStatic: boolean =
      createTagDto.conditions == null || createTagDto.conditions.length == 0;
    const createConditions: TagConditions[] =
      createIsStatic == true ? [] : createTagDto.conditions;

    const res = await this.tagRepository.findOne({
      where: {
        name: createTagDto.name,
        resource: createTagDto.resource,
        resourceId: createTagDto.resourceId,
        resourceType: createTagDto.resourceType,
        type: createTagDto.type,
      },
    });

    if (res == null) {
      return new ResponseTagDto(
        await this.tagRepository.save({
          ...createTagDto,
          updatedBy: createdBy,
          slug: slug,
          isStatic: createIsStatic,
          conditions: createConditions,
        }),
      );
    }

    if (createIsStatic == false) {
      res.conditions = this.mergeConditions(createConditions, res.conditions);
    } else {
      res.conditions = [];
    }
    res.updatedBy = createTagDto.createdBy;
    res.isStatic = createIsStatic;
    return new ResponseTagDto(await this.tagRepository.save(res));
  }

  async find(id: string): Promise<ResponseTagDto> {
    const res: Tag = await this.tagRepository.findOne({
      where: { id: id },
    });
    console.log(res);
    if (res == null) {
      throw new NotFoundException('No Tag found');
    }
    return new ResponseTagDto(res);
  }

  async findAll(getDto: GetTagDto): Promise<ResponseTagDto[]> {
    console.log(getDto.resource);
    const res: Tag[] = await this.tagRepository.find({
      where: {
        resource: getDto.resource,
        resourceId: getDto.resourceId,
        resourceType: getDto.resourceType,
        type: getDto.type,
        name: getDto.name,
      },
    });

    if (res.length == 0) {
      console.log('res.length==0');
      throw new NotFoundException('No Tag found');
    }
    const response: ResponseTagDto[] = [];
    res.forEach(function (r) {
      response.push(new ResponseTagDto(r));
    });
    return response;
  }

  async delete(id: string, updatedBy: string) {
    const todo: Tag = await this.tagRepository.findOne({ where: { id: id } });
    if (todo) {
      todo.updatedBy = updatedBy;
      await this.tagRepository.save(todo);
    } else {
      throw new NoTagFoundException(id);
    }
    await this.tagRepository.softDelete(id);
    return response.status(HttpStatus.NO_CONTENT);
  }

  async update(
    id: string,
    updateTagDto: UpdateTagDto,
  ): Promise<ResponseTagDto> {
    const updateIsStatic: boolean =
      updateTagDto.conditions == null || updateTagDto.conditions.length == 0;
    const updateConditions: TagConditions[] =
      updateIsStatic == true ? [] : updateTagDto.conditions;

    const todoTag: Tag = await this.tagRepository.findOne({
      where: { id: id },
    });
    if (!todoTag) {
      throw new NoTagFoundException(id);
    }
    this.matchCoreFields(todoTag, updateTagDto);

    const { isStatic: todoIsStatic, conditions: todoConditions } = todoTag;

    if (todoIsStatic && !updateIsStatic) {
      todoTag.conditions = updateConditions;
    } else if (!todoIsStatic && updateIsStatic) {
      todoTag.conditions = [];
    } else if (!todoIsStatic && !updateIsStatic) {
      todoTag.conditions = await this.mergeConditions(
        todoConditions,
        updateConditions,
      );
    }

    todoTag.isStatic = updateIsStatic;
    todoTag.updatedBy = updateTagDto.updatedBy;
    return new ResponseTagDto(await this.tagRepository.save(todoTag));
  }
  matchCoreFields(firstTagDto: Tag, secondTagDto: UpdateTagDto) {
    if (
      createCoreFieldsString(firstTagDto) !=
      createCoreFieldsString(secondTagDto)
    ) {
      console.log(createSlug(firstTagDto));
      console.log(createSlug(secondTagDto));
      throw new UnmatchingTagDetailsValidationException(
        'resourceId, resourceType, resource, name or type of tag are unmatching with existing tag',
      );
    }
  }

  isStaticValidation(isStatic: boolean, conditions: TagConditions[]) {
    if (conditions == null && isStatic == false) {
      throw new TagConditionsValidationException(
        'isStatic and conditions are inconsistent',
      );
    }
  }

  uploadTags(grid: any[][], createdBy: string): void {
    const numberOfCols = grid[0].length;
    const numberOfRows = grid.length;

    for (let col = 1; col < numberOfCols; col++) {
      const tagType = grid[1][col];
      const tagKeywords = new Map<string, string[]>();

      for (let row = 2; row < numberOfRows; row++) {
        const name = grid[row][col];
        const keyword = grid[row][1];
        if (!tagKeywords.has(name)) {
          tagKeywords.set(name, []);
        }
        tagKeywords.get(name)?.push(keyword);
      }

      for (const [name, keywords] of tagKeywords.entries()) {
        const createTagDto: CreateTagDto = {
          name,
          type: tagType,
          conditions: [
            {
              field: 'description',
              condition: 'contains',
              keywords: keywords,
            },
          ],
          createdBy: createdBy,
          resource: null,
          resourceId: null,
          resourceType: null,
        };
        this.create(createTagDto);
        console.log('success');
      }
    }
  }
}
