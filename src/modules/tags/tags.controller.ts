import {
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
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { parse } from 'csv-parse';
import { diskStorage } from 'multer';
import { UpdatedByDto } from '../../common/dto/updatedBy.dto';
import { CreatedByDto } from './../../common/dto/createdBy.dto';
import { logger } from './../../config/logger';
import { csvFileFilter } from './../../utils/csvHelpers';
import { CreateTagDto } from './dto/createTag.dto';
import { GetTagDto } from './dto/getTag.dto';
import { ResponseTagDto } from './dto/responseTag.dto';
import { UpdateTagDto } from './dto/updateTag.dto';
import resourceValidation from './dto/validations/resourceValidation.validation';
import { TagsService } from './tags.service';

/**
 * TagsController
 * @export
 * @class TagsController
 */
@Controller('tags')
export class TagsController {
  /**
   * constructor
   * Creates an instance of TagsController.
   * @param {TagsService} tagsService
   * @memberof TagsController
   */
  constructor(private readonly tagsService: TagsService) {}

  /**
   * create
   * @param {CreateTagDto} createTagDto
   * @return {Promise<ResponseTagDto>}
   * @memberof TagsController
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Post: Create a new tag.',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Successful',
    type: CreateTagDto,
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
    return this.tagsService.create(createTagDto);
  }

  /**
   *getById
   * @param {string} id
   * @return {Promise<ResponseTagDto>}
   * @memberof TagsController
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiOperation({
    summary: 'Get: Get a single tag by its ID.',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Successful',
    type: ResponseTagDto,
  })
  getById(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<ResponseTagDto> {
    return this.tagsService.find(id);
  }

  /**
   * getAll
   * @param  {GetTagDto} getDto
   * @return {Promise<ResponseTagDto>}
   * @memberof TagsController
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
  public async getAll(
    @Query(new ValidationPipe()) getTagDto: GetTagDto,
  ): Promise<ResponseTagDto[]> {
    resourceValidation(
      getTagDto.resourceId,
      getTagDto.resourceType,
      getTagDto.resource,
    );
    return this.tagsService.findAll(getTagDto);
  }

  /**
   * update
   * @param {string} id
   * @param {UpdateTagDto} updateTagDto
   * @return {Promise<ResponseTagDto>}
   * @memberof TagsController
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
    return this.tagsService.update(id, updateTagDto);
  }

  /**
   * delete
   * @param {string} id
   * @return {HttpStatus.NO_CONTENT}
   * @memberof TagsController
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Portal: Archive a single user by its ID.',
  })
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiOkResponse({
    status: 204,
    description: 'Successful',
    type: String,
  })
  delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) updatedByDto: UpdatedByDto,
  ) {
    return this.tagsService.delete(id, updatedByDto.updatedBy);
  }

  /**
   * create bulk-upload
   * @param {Express.Multer.File} file
   * @param {string} createdBy
   * @return {Object}
   * @memberof TagsController
   */
  @Post('bulk-upload')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Post: Create tags from a csv file',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Successful',
    type: Object,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/uploads',
      }),
      fileFilter: csvFileFilter,
    }),
  )
  uploadFile(
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
      this.tagsService.uploadTags(result, createdBy);
    });
    return response;
  }
}
