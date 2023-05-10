import { PartialType } from '@nestjs/mapped-types';
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CreateTagDto } from './createTag.dto';
import { TagConditions } from './tagConditions.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  /**
   * name
   * @type {string}
   * @memberof UpdateTagDto
   */
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    description: 'name of tag',
    type: String,
    required: true,
    example: 'revenue',
  })
  name: string;

  /**
   * type
   * @type {string}
   * @memberof UpdateTagDto
   */
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    description: 'type of tag',
    type: String,
    required: true,
    example: 'category',
  })
  type: string;

  /**
   * updatedBy
   * @type {UUID}
   * @memberof UpdateTagDto
   */
  @IsDefined()
  @IsUUID()
  @ApiProperty({
    description: 'identifier of tag updator',
    type: UUID,
    required: true,
    example: '6ebb0c45-f709-44a6-9fd9-476d1c9484e9',
  })
  updatedBy: string;

  /**
   * resource
   * @type {string}
   * @memberof UpdateTagDto
   */
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'name of resource',
    type: String,
    required: false,
    example: 'bank',
  })
  resource?: string;

  /**
   * resourceId
   * @type {string}
   * @memberof UpdateTagDto
   */
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'name of resourceId',
    type: String,
    required: false,
    example: 'T001',
  })
  resourceId?: string;

  /**
   * resourceType
   * @type {string}
   * @memberof UpdateTagDto
   */
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'name of resourceType',
    type: String,
    required: false,
    example: 'GST',
  })
  resourceType?: string;

  /**
   * conditions
   * @type {TagConditions[]}
   * @memberof UpdateTagDto
   */
  @IsOptional()
  @ApiPropertyOptional({
    description: 'tag conditions',
    type: Array,
    isArray: true,
    required: false,
  })
  conditions?: TagConditions[];
}
