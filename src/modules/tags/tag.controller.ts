import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import * as fs from 'fs';

import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { parse } from 'csv-parse';
import { diskStorage } from 'multer';
import { UpdatedByDto } from '../../common/dto/updatedBy.dto';
import { logger } from '../../config/logger';
import { csvFileFilter } from '../../utils/csvHelpers';
import { CreateTagDto } from './dto/createTag.dto';
import { GetTagDto } from './dto/getTag.dto';
import { ResponseTagDto } from './dto/responseTag.dto';
import { UpdateTagDto } from './dto/updateTag.dto';
import resourceValidation from './dto/validations/resourceValidation.validation';
import { TagService } from './tag.service';
import { NoTagFoundException } from './../../exceptions/noTagFoundException.exception';
import { Any } from 'typeorm';
import { response } from 'express';

/**
 * TagController
 * @export
 * @class TagController
 */
@ApiTags('Tag')
@Controller('tag')
export class TagController {
  /**
   * constructor
   * Creates an instance of TagController.
   * @param {TagService} tagService
   * @memberof TagController
   */
  constructor(private readonly tagService: TagService) {}

  /**
   * create
   * @param {CreateTagDto} createTagDto
   * @return {Promise<ResponseTagDto>}
   * @memberof TagController
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Post: Create a new tag.',
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'Tag has been successfully created. ',
    type: CreateTagDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Tag has not been created. Bad request.',
    type: BadRequestException,
  })
  public async create(
    @Body(new ValidationPipe()) createTagDto: CreateTagDto,
  ): Promise<ResponseTagDto> {
    logger.info('Post: tags-svc/tags');
    resourceValidation(
      createTagDto.resourceId,
      createTagDto.resourceType,
      createTagDto.resource,
    );
    return this.tagService.create(createTagDto);
  }

  @Get('123')
  public name() {
    this.tagService.func();
  }
  /**
   *getById
   * @param {string} id
   * @return {Promise<ResponseTagDto>}
   * @memberof TagController
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiOperation({
    summary: 'Get: Get a single tag by its ID.',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Found tag successfully.',
    type: ResponseTagDto,
  })
  @ApiNotFoundResponse({
    status: 204,
    description: 'No tag founded.',
    type: NoTagFoundException,
  })
  @ApiBadRequestResponse({
    status: 404,
    description: 'Bad request.',
    type: BadRequestException,
  })
  getById(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<ResponseTagDto> {
    return this.tagService.getById(id);
  }

  /**
   * getAll
   * @param  {GetTagDto} getDto
   * @return {Promise<ResponseTagDto>}
   * @memberof TagController
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'getTagDto', type: GetTagDto, required: true })
  @ApiOperation({
    summary: 'Get: Get a list of all tags with conditions.',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Successful',
    type: GetTagDto,
  })
  @ApiNotFoundResponse({
    status: 204,
    description: 'No tag founded.',
    type: NoTagFoundException,
  })
  @ApiBadRequestResponse({
    status: 404,
    description: 'Bad request.',
    type: BadRequestException,
  })
  public async getAll(
    @Query(new ValidationPipe()) getTagDto: GetTagDto,
  ): Promise<ResponseTagDto[]> {
    return this.tagService.getAllTags(getTagDto);
  }

  /**
   * update
   * @param {string} id
   * @param {UpdateTagDto} updateTagDto
   * @return {Promise<ResponseTagDto>}
   * @memberof TagController
   */
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Patch: Update existing tag with conditions',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Successful',
    type: ResponseTagDto,
  })
  @ApiNoContentResponse({
    status: 204,
    description: 'No tag founded.',
    type: NoTagFoundException,
  })
  @ApiBadRequestResponse({
    status: 404,
    description: 'Bad request.',
    type: BadRequestException,
  })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateTagDto: UpdateTagDto,
  ): Promise<ResponseTagDto> {
    console.log('Entered into controller function');
    resourceValidation(
      updateTagDto.resourceId,
      updateTagDto.resourceType,
      updateTagDto.resource,
    );
    return this.tagService.update(id, updateTagDto);
  }

  /**
   * delete
   * @param {string} id
   * @return {HttpStatus.NO_CONTENT}
   * @memberof TagController
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiOperation({
    summary: 'Portal: Archive a single user by its ID.',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Successful',
    type: Any,
  })
  @ApiNoContentResponse({
    status: 204,
    description: 'No tag founded.',
    type: NoTagFoundException,
  })
  @ApiBadRequestResponse({
    status: 404,
    description: 'Bad request.',
    type: BadRequestException,
  })
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) updatedByDto: UpdatedByDto,
  ) {
    return await this.tagService.delete(id, updatedByDto.updatedBy);
  }

  /**
   * create bulk-upload
   * @param {Express.Multer.File} file
   * @param {string} createdBy
   * @return {Object}
   * @memberof TagController
   */
  @Post('bulk-upload')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Post: Create tags from a csv file',
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'Successful',
    type: Object,
  })
  @ApiBadRequestResponse({
    status: 404,
    description: 'Bad request.',
    type: BadRequestException,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/uploads',
      }),
      fileFilter: csvFileFilter,
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('createdBy', ParseUUIDPipe) createdBy: string,
  ) {
    const response = {
      message: 'Tags created successfully!',
    };
    const csvFilePath = 'src/uploads/' + file.filename;
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    parse(fileContent, { delimiter: ',' }, (error, result) => {
      if (error) {
        logger.error(error);
      }
      this.tagService.uploadTags(result, createdBy);
    });
    return response;
  }
}
